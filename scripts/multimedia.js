const {writeFileSync} = require('fs');
const {join} = require('path');
const groupBy = require('lodash.groupby');

const eventsData = require('../data/eventos.json');
const multimediaData = require('../data/_multimedia.json');

const eventsDataGrouped = groupBy(eventsData.filter((event) => event.comunidad), 'comunidad');

const eventsDataSummarized = Object.keys(eventsDataGrouped).map((key, index) => {
  const data = eventsDataGrouped[key];
  const [first] = data;
  const fotos = data.map((record) => record.foto).flat();
  const thumbnails = data.map((record) => record.thumbnail);
  const events = data.map((record) => record.nombre_evento);
  return {
    id: index + 1,
    nombre_galeria: key,
    municipio: first.municipio,
    departamento: '',
    comunidad_focalizada: key,
    descripcion: `Fotos de los eventos:\n${events.join('\n')}`.trim(),
    fotos,
    type: 'evento',
    tipo_multimedia: 'Fotografía',
    thumbnail: thumbnails.find((t) => t),
  };
});

const multimediaDataSummarized = multimediaData.map((record, index) => ({
  id: eventsDataSummarized.length + index + 1,
  ...record,
  type: record.tipo_multimedia ? record.tipo_multimedia.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : 'fotografia',
  thumbnail: '/images/eventos/prueba.jpg',
  fotos: (JSON.parse(record.fotos))?.map((fot) => fot.url) || [],
}));

const newData = [...eventsDataSummarized, ...multimediaDataSummarized];

writeFileSync(join(__dirname, '..', 'data', 'multimediaCOPY.json'), JSON.stringify(newData));
