const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');
const trrs = require('../data/territorios.json');

const slugList = trrs.map((trr) => trr.municipio.toLowerCase().replace(/\s/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, ''));

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: {
        width: 1366,
        height: 768,
      },
    });
    const page = await browser.newPage();
    for (let index = 0; index < slugList.length; index++) {
      console.log(`Create PDF for ${slugList[index]}`);
      await page.goto(`http://localhost:1313/reporte/${slugList[index]}/`, {
        waitUntil: 'networkidle0',
      });
      const pdf = await page.pdf({
        format: 'letter',
        printBackground: true,
      });
      await fs.writeFile(path.join(__dirname, '..', 'static', 'reportes', `${slugList[index]}.pdf`), pdf);
      console.log(`PDF created for ${slugList[index]}`);
    }
    await browser.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
