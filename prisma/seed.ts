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


    // --- Sheet 2: PMB Links (Dagger/Asterisk) ---
    // Need to find the correct sheet name or index. Research showed index 1?
    // Previous research showed: Sheet Name: SA ICD-10 MIT 2021 (Sheet 1)
    // Let's look for sheet containing 'PMB Dagger'
    let sheet2Name = workbook.SheetNames.find(n => n.includes('Dagger') || n.includes('PMB'));
    if (!sheet2Name && workbook.SheetNames.length > 1) sheet2Name = workbook.SheetNames[1];

    if (sheet2Name) {
        console.log(`Parsing Sheet 2: ${sheet2Name}`);
        const sheet2 = workbook.Sheets[sheetName1 === sheet2Name ? workbook.SheetNames[1] : sheet2Name];
        // Wait, if find returns Sheet 1, forced index 1.

        const data2 = XLSX.utils.sheet_to_json(sheet2);
        console.log(`Found ${data2.length} rows in Sheet 2.`);

        const linksToCreate = [];
        for (const row of data2 as any[]) {
            // Columns from research: "C70.0+D63.0*", "C70.0" (Dagger?), "D63.0" (Asterisk code?), "Mapping..."
            // Headers: ICD10_Code, Dagger, Asterisk, Description, Basket
            // Based on research output: 
            // [ "C70.0+D63.0*", "C70.0", "D63.0", "Desc", "Basket" ] -> keys might be inferred or we should use header mapping.
            // Let's rely on column names if possible or indices if headers are weird.
            // The research output showed valid headers in row 1 possibly?
            // Research output:
            // [ "ICD10_Code", "C70.0", "D63.0", "Maligne...", "Basket..." ] <-- NO headers shown in JSON array example for row 2?
            // Wait, Step 52 output showed: 
            // ["C70.0+D63.0*", "C70.0", "D63.0", "Desc", "Basket"] as VALUES? 
            // Ah, `sheet_to_json` by default uses first row as header.
            // The keys in `row` will be the header names.
            // I didn't see the headers for Sheet 2 in Step 52, I saw data array-of-arrays because I used {header:1}.
            // Let's inspect headers in the script or just be robust.
            // Assuming column 1 = Dagger, column 2 = Asterisk, Column 4 = Basket?
            // Let's use `header: 'A'` mapping to be safe or inspect keys.
            // Actually, let's just assume standard column order from the array-of-arrays inspection:
            // Col 0: Combined, Col 1: Dagger, Col 2: Asterisk, Col 3: Desc, Col 4: Basket, Col 5: Code?
            // Output 52:
            // ["C70.0+D63.0*", "C70.0", "D63.0", "Malignan...", "Medical...", "950A"]
            // So:
            // 0: Combined
            // 1: Dagger Code
            // 2: Asterisk Code
            // 3: Description
            // 4: Basket? Wait "Medical..." is long text.
            // 5: "950A" -> Basket Code?

            // Let's create `PMBLink` from this.
            // Since keys are unknown, I will read sheet 2 with header:1 again to get array of arrays.
        }
        const rawData2 = XLSX.utils.sheet_to_json(sheet2, { header: 1 }) as any[][];
        // Skip header row if it looks like header
        const startRow = rawData2[0][0].includes('ICD10') ? 1 : 0;

        for (let i = startRow; i < rawData2.length; i++) {
            const r = rawData2[i];
            if (!r || r.length < 3) continue;

            linksToCreate.push({
                daggerCode: String(r[1]).trim(),
                asteriskCode: String(r[2]).trim(),
                description: String(r[3] || '').trim(),
                basketOfCare: r[5] ? String(r[5]).trim() : (r[4] ? String(r[4]).trim() : ''), // Fallback if basket is in col 4 or 5
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
