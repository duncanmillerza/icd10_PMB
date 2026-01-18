const XLSX = require('xlsx');
const fs = require('fs');

const filename = 'ICD-10 Master Table Mar 2021 (1).xlsx';

try {
  const workbook = XLSX.readFile(filename);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  // Get first 5 rows to see headers and some data
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }).slice(0, 5);
  console.log('Sheet Name:', sheetName);
  console.log(JSON.stringify(data, null, 2));
} catch (e) {
  console.error('Error reading file:', e);
}
