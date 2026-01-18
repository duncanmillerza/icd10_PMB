const XLSX = require('xlsx');
const filename = 'ICD-10 Master Table Mar 2021 (1).xlsx';

try {
    const workbook = XLSX.readFile(filename);
    console.log('Sheet Names:', workbook.SheetNames);

    workbook.SheetNames.forEach(name => {
        console.log(`\n--- Inspecting Sheet: ${name} ---`);
        const sheet = workbook.Sheets[name];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }).slice(0, 5);
        console.log(JSON.stringify(data, null, 2));
    });
} catch (e) {
    console.error('Error reading file:', e);
}
