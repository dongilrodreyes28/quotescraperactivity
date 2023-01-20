// Import puppeteer
import puppeteer from 'puppeteer';
import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exportQuotes= async (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Quotes');

  worksheet.columns = [
    { key: 'quote', header: 'Quote' },
    { key: 'author', header: 'Author' },
    { key: 'tags', header: 'Tags' },
  ];

  data.forEach((item) => {
    worksheet.addRow(item);
  });

  const exportPath = path.resolve(__dirname, 'quotes.xlsx');
  await workbook.xlsx.writeFile(exportPath);
};

const scrapedQuotes = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://quotes.toscrape.com/');
  await page.setViewport({ width: 1280, height: 607 })

  let data = await page.evaluate(() => {
    let results = []
    let items = document.querySelectorAll("div > .quote")

    items.forEach(item => {
      let tag_results = [];
      let tag_items = item.querySelectorAll(".tag");

      tag_items.forEach(x => {
        tag_results.push(x.innerHTML);
      });

      results.push({
        quote: item.querySelector(".text").innerHTML,
        author: item.querySelector(".author").innerHTML,
        tags: tag_results,
      });
    })

    return results
  })

  const sendQuotes = exportQuotes(data);
  
  console.log(sendQuotes)
  await browser.close();
};

scrapedQuotes();