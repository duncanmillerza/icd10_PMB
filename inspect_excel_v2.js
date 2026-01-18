const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(process.cwd(), '_source_files', 'ICD-10 Master Table Mar 2021 (1).xlsx');
console.log('Reading file:', filePath);

const workbook = XLSX.readFile(filePath);
console.log('Sheet Names:', workbook.SheetNames);

workbook.SheetNames.forEach((name, index) => {
    console.log(`\n--- Sheet ${index + 1}: ${name} ---`);
    const sheet = workbook.Sheets[name];
    // Get range
    const range = XLSX.utils.decode_range(sheet['!ref']);
    // Read first row (headers)
    const headers = [];
    for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = sheet[XLSX.utils.encode_cell({ r: range.s.r, c: C })];
        headers.push(cell ? cell.v : `UNKNOWN_C${C}`);
    }
    console.log('Headers:', headers);

    // Preview first data row
    if (range.e.r > 0) {
        const firstRow = [];
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cell = sheet[XLSX.utils.encode_cell({ r: range.s.r + 1, c: C })];
            firstRow.push(cell ? cell.v : null);
        }
        console.log('First Row Data:', firstRow);
    }
});
