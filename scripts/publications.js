const fs = require('fs/promises');
const data = require('../data/publicaciones.json');
const {getFilePath} = require('./utils');
const {URL} = require('url');

async function run() {
  const publications = data.map((item) => {
    return {
      ...item,
      archivo_pdf: (JSON.parse(item.archivo_pdf) || []).map((file) => {
        const fileURL = new URL(file.url);
        if (fileURL.protocol === 'http:') {
          fileURL.protocol = 'https';
        }
        return {
          title: file.title,
          url: fileURL.toString(),
        };
      }),
    };
  });
  fs.writeFile(
      getFilePath('publicaciones.json'),
      JSON.stringify(publications),
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
