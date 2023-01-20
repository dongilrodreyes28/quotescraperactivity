import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const countries= [
  { name: 'Cameroon', capital: 'Yaounde', countryCode: 'CM', phoneIndicator: 237 },
  { name: 'France', capital: 'Paris', countryCode: 'FR', phoneIndicator: 33 },
  { name: 'United States', capital: 'Washington, D.C.', countryCode: 'US', phoneIndicator: 1 },
  { name: 'India', capital: 'New Delhi', countryCode: 'IN', phoneIndicator: 91 },
  { name: 'Brazil', capital: 'Brasília', countryCode: 'BR', phoneIndicator: 55 },
  { name: 'Japan', capital: 'Tokyo', countryCode: 'JP', phoneIndicator: 81 },
  { name: 'Australia', capital: 'Canberra', countryCode: 'AUS', phoneIndicator: 61 },
  { name: 'Nigeria', capital: 'Abuja', countryCode: 'NG', phoneIndicator: 234 },
  { name: 'Germany', capital: 'Berlin', countryCode: 'DE', phoneIndicator: 49 },
];

const exportCountriesFile = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Countries List');

    worksheet.columns = [
      { key: 'name', header: 'Name' },
      { key: 'countryCode', header: 'Country Code' },
      { key: 'capital', header: 'Capital' },
      { key: 'phoneIndicator', header: 'International Direct Dialling' },
    ];

countries.forEach((item) => {
    worksheet.addRow(item);
  });

const exportPath = path.resolve(__dirname, 'countries.xlsx');
await workbook.xlsx.writeFile(exportPath);
};

exportCountriesFile();