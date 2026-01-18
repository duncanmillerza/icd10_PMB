const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(process.cwd(), '_source_files', 'ICD-10 Master Table Mar 2021 (1).xlsx');
console.log('Reading:', filePath);

const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Get headers (first row)
const headers = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0];
console.log('Headers:', headers);
