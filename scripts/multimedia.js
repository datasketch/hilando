const {writeFileSync} = require('fs');
const {join} = require('path');
const groupBy = require('lodash.groupby');
const orderBy = require('lodash.orderby');

const eventsData = require('../data/eventos.json');
const multimediaData = require('../data/multimedia.json');

const eventsByCommunity = groupBy(eventsData.filter((event) => event.comunidad), 'comunidad');

const eventsDataSummarized = Object.keys(eventsByCommunity).map((key, index) => {
  const data = eventsByCommunity[key];
  const [first] = data;
  const foto = data.map((record) => record.foto).flat();
  const thumbnails = data.map((record) => record.thumbnail);
  // const events = data.map((record) => record.nombre_evento);
  const departments = data.map(((record) => record.macroregion));
  return {
    id: index + 1,
    nombre_galeria: key,
    municipio: first.municipio,
    departamento: departments,
    comunidad_focalizada: key,
    descripcion: `Esta es la galería de las actividades realizadas en ${key}.`,
    foto,
    type: 'evento',
    tipo_multimedia: 'Fotografía',
    thumbnail: thumbnails.find((t) => t),
  };
});

const base = eventsDataSummarized.length;

const multimediaDataSummarized = multimediaData.map((record, index) => {
  const photos = JSON.parse(record.fotos);
  return {
    ...record,
    id: base + index + 1,
    type: record.tipo_galeria ? record.tipo_galeria.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : 'fotografia',
    thumbnail: '/images/eventos/prueba.jpg',
    foto: Array.isArray(photos) ? photos.map((p) => p.url) : [],
    tipo_multimedia: record.tipo_galeria,
  };
});

const multimediaDataSummarizedDesc = orderBy(multimediaDataSummarized, 'id', 'desc');

const newData = [...multimediaDataSummarizedDesc, ...eventsDataSummarized];

writeFileSync(join(__dirname, '..', 'data', 'eventos_multimedia.json'), JSON.stringify(newData));
