const fs = require('fs/promises');
const data = require('../data/eventos.json');
const {getFilePath} = require('./utils');
const isURL = require('validator/lib/isURL');
const {URL} = require('url');

const dataEvents = data.map((item) => {
  const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const currentYear = new Date().getFullYear() + '';
  const month = (monthNames.indexOf(item.mes.toLowerCase().trim()) + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
  const day = Number(item.dia_inicio).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});

  let photos = item.foto ? (JSON.parse(item.foto)).map((item) => item.url) : [];
  photos = photos.map((photo) => {
    if (!isURL(photo, {require_protocol: true})) return photo;
    const u = new URL(photo);
    if (u.protocol === 'https:') return photo;
    u.protocol = 'https';
    return u.toString();
  });

  return {
    ...item,
    mes: item.mes.trim(),
    foto: photos,
    thumbnail: photos[0] || '/images/eventos/prueba.jpg',
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
