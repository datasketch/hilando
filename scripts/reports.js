const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');
const trrs = require('../data/territorios.json');
const communityData = require('../data/comunidades-focalizadas.json');

const slugMunicipalityNames = trrs.map((trr) => trr.municipio.toLowerCase().replace(/\s/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, ''));

const slugCommunityNames = communityData.map((comm) => comm.nombre_comunidad.toLowerCase().replace(/\s/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, ''));

const domain = 'https://www.hilandocomunidades.com';

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
    for (let index = 0; index < slugMunicipalityNames.length; index++) {
      console.log(`Generando PDF (${slugMunicipalityNames[index]})`);
      await page.goto(`${domain}/reportes/${slugMunicipalityNames[index]}/`, {
        waitUntil: 'networkidle0',
      });
      const pdf = await page.pdf({
        format: 'letter',
        printBackground: true,
      });
      await fs.writeFile(path.join(__dirname, '..', 'static', 'reportes', `${slugMunicipalityNames[index]}.pdf`), pdf);
      console.log('PDF generado');
      console.log('~~~');
    }
    await browser.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

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
    for (let index = 0; index < slugCommunityNames.length; index++) {
      console.log(`Generando PDF (${slugCommunityNames[index]})`);
      await page.goto(`${domain}/reportes/${slugCommunityNames[index]}/`, {
        waitUntil: 'networkidle0',
      });
      const pdf = await page.pdf({
        format: 'letter',
        printBackground: true,
      });
      await fs.writeFile(path.join(__dirname, '..', 'static', 'reportes', `${slugCommunityNames[index]}.pdf`), pdf);
      console.log('PDF generado');
      console.log('~~~');
    }
    await browser.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
