const fs = require('fs/promises');
const data = require('../data/publicaciones.json');
const {getFilePath} = require('./utils');

async function run() {
  const publications = data.map((item) => {
    return {
      ...item,
      archivo_pdf: (JSON.parse(item.archivo_pdf) || []).map((file) => ({
        title: file.title,
        url: file.url,
      })),
    };
  });
  fs.writeFile(
      getFilePath('eventos.json'),
      JSON.stringify(publications),
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
