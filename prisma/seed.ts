import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const sourcePath = path.join(process.cwd(), '_source_files', 'ICD-10 Master Table Mar 2021 (1).xlsx');

async function main() {
    console.log(`Loading Excel from ${sourcePath}`);
    const workbook = XLSX.readFile(sourcePath);

    // --- Sheet 1: ICD-10 Codes ---
    const sheetName1 = workbook.SheetNames[0]; // Assuming first sheet
    console.log(`Parsing Sheet 1: ${sheetName1}`);
    const sheet1 = workbook.Sheets[sheetName1];
    const data1 = XLSX.utils.sheet_to_json(sheet1);

    console.log(`Found ${data1.length} rows in Sheet 1.`);

    const codesToUpsert = [];
    for (const row of data1 as any[]) {
        if (!row['ICD10_Code']) continue;

        const isY = (val: string) => val === 'Y';

        codesToUpsert.push({
            code: String(row['ICD10_Code']).trim(),
            description: String(row['WHO_Full_Desc'] || '').trim(),
            validForBilling: isY(row['Valid_ICD10_ClinicalUse']),
            validPrimary: isY(row['Valid_ICD10_Primary']),
            isAsterisk: isY(row['Valid_ICD10_Asterisk']),
            isDagger: isY(row['Valid_ICD10_Dagger']),
            isSequelae: isY(row['Valid_ICD10_Sequelae']),
            isPMB: isY(row['PMB']),
            basketOfCare: row['PMB basket'] ? String(row['PMB basket']).trim() : null,
            pmbDescription: row['PMB Description'] ? String(row['PMB Description']).trim() : null,
            pmbComments: row['PMB Comment'] ? String(row['PMB Comment']).trim() : null,
            pmbCode: row['PMB Code'] ? String(row['PMB Code']).trim() : null,
        });
    }

    console.log('Upserting ICD10 Codes... (this might take a moment)');
    // Using transaction for speed if possible, or createMany
    // SQLite supports createMany in newer Prisma versions? Yes.
    // But we want upsert logic? Or just deleteMany then createMany given we are seeding.
    // Ideally reset DB first.

    await prisma.iCD10Code.deleteMany({});
    await prisma.iCD10Code.createMany({
        data: codesToUpsert,
    });
    console.log(`Inserted ${codesToUpsert.length} codes.`);



    // --- Sheet 3: PMB Master List ---
    const sheet3 = workbook.Sheets['Sheet3'];
    const pmbDefinitions = [];
    const pmbMap = new Map<string, { description: string, basket: string }>();

    if (sheet3) {
        console.log('Parsing Sheet 3 (PMB Master List)...');
        const data3 = XLSX.utils.sheet_to_json(sheet3);

        for (const row of data3 as any[]) {
            // Headers: 'PMB Code', 'PMB Description', 'PMB Basket of Care'
            const code = row['PMB Code'] ? String(row['PMB Code']).trim() : null;
            if (!code) continue;

            const def = {
                code,
                description: row['PMB Description'] ? String(row['PMB Description']).trim() : '',
                basketOfCare: row['PMB Basket of Care'] ? String(row['PMB Basket of Care']).trim() : '',
            };

            pmbDefinitions.push(def);
            pmbMap.set(code, { description: def.description, basket: def.basketOfCare });
        }

        await prisma.pMBDefinition.deleteMany({});
        await prisma.pMBDefinition.createMany({ data: pmbDefinitions });
        console.log(`Inserted ${pmbDefinitions.length} PMB Definitions.`);
    } else {
        console.warn('Sheet 3 not found!');
    }


    // --- Sheet 2: PMB Links (Dagger/Asterisk) ---
    // User calls this "Sheet 2", script finds it by name "Dagger and Astrix PMB"
    let sheetLinkName = workbook.SheetNames.find(n => n.includes('Dagger') || n.includes('Astrix'));
    // Fallback logic
    if (!sheetLinkName) {
        // Attempt to find by content? Or just look at index 3 based on inspection
        if (workbook.SheetNames.length > 3) sheetLinkName = workbook.SheetNames[3];
    }

    if (sheetLinkName) {
        console.log(`Parsing PMB Links from: ${sheetLinkName}`);
        const sheetLinks = workbook.Sheets[sheetLinkName];

        // Use header:1 to get raw arrays because we know column indices roughly or want to be robust
        const rawDataLinks = XLSX.utils.sheet_to_json(sheetLinks, { header: 1 }) as any[][];
        // Skip header row
        const startRowLinks = 1;

        const linksToCreate = [];
        for (let i = startRowLinks; i < rawDataLinks.length; i++) {
            const r = rawDataLinks[i];
            if (!r || r.length < 3) continue;

            const dagger = String(r[1]).trim();
            if (!dagger) continue;

            // In "Dagger and Astrix" sheet:
            // Col 5 (Index 5) = PMB Code
            // Col 4 (Index 4) = Basket (legacy/direct)
            const pmbCode = r[5] ? String(r[5]).trim() : null;

            let basket = r[4] ? String(r[4]).trim() : '';
            let pmbDesc = '';

            // Lookup Details from Sheet 3 data
            if (pmbCode && pmbMap.has(pmbCode)) {
                const details = pmbMap.get(pmbCode)!;
                // User said: "look up the details... on Sheet 3"
                // So we override/use Sheet 3 data.
                basket = details.basket;
                pmbDesc = details.description;
            }

            linksToCreate.push({
                daggerCode: dagger,
                asteriskCode: String(r[2]).trim(),
                description: String(r[3] || '').trim(),
                basketOfCare: basket,
                pmbCode: pmbCode,
                pmbDescription: pmbDesc
            });
        }

        await prisma.pMBLink.deleteMany({});
        await prisma.pMBLink.createMany({ data: linksToCreate });
        console.log(`Inserted ${linksToCreate.length} PMB Links.`);
    }

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
