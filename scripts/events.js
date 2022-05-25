const fs = require('fs/promises');
const data = require('../data/eventos.json');
const path = require('path');

const dataEvents = data.map((item) => {
  return {
    ...item,
    mes: item.mes.trim(),
    foto: (JSON.parse(item.foto))?.map((fot) => fot.url) || [],
    thumbnail: (JSON.parse(item.foto))?.map((fot) => fot.url)[0] || '/images/eventos/prueba.jpg',
  };
});

const getFilePath = (filename) => {
  return path.join(__dirname, '..', 'data', filename);
};

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
