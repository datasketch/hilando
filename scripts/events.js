const fs = require('fs/promises');
const data = require('../data/eventos.json');
const {getFilePath} = require('./utils');

const dataEvents = data.map((item) => {
  return {
    ...item,
    mes: item.mes.trim(),
    foto: (JSON.parse(item.foto))?.map((fot) => fot.url) || [],
    thumbnail: (JSON.parse(item.foto))?.map((fot) => fot.url)[0] || '/images/eventos/prueba.jpg',
  };
});

async function run() {
  fs.writeFile(
      getFilePath('eventos.json'),
      JSON.stringify(dataEvents),
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
