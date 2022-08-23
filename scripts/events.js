const fs = require('fs/promises');
const data = require('../data/eventos.json');
const {getFilePath} = require('./utils');

const dataEvents = data.map((item) => {
  const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const currentYear = new Date().getFullYear() + '';
  const month = (monthNames.indexOf(item.mes.toLowerCase()) + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
  const day = Number(item.dia_inicio).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
  // console.log(`date format: ${currentYear}-${month}-${day}`);
  return {
    ...item,
    mes: item.mes.trim(),
    foto: (JSON.parse(item.foto))?.map((fot) => fot.url) || [],
    thumbnail: (JSON.parse(item.foto))?.map((fot) => fot.url)[0] || '/images/eventos/prueba.jpg',
    date: `${currentYear}-${month}-${day}`,
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
