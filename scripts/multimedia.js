const {writeFileSync} = require('fs');
const {join} = require('path');
const groupBy = require('lodash.groupby');
const orderBy = require('lodash.orderby');
const {URL} = require('url');
const isURL = require('validator/lib/isURL');
const omit = require('lodash.omit');

const eventsData = require('../data/eventos.json');
const multimediaData = require('../data/multimedia.json');

const eventsGroup = groupBy(
    eventsData
        .map((e) => ({...e, comunidad: e.comunidad ? e.comunidad.trim() : e.comunidad}))
        .filter((e) => e.comunidad),
    'comunidad',
);

const events = Object.keys(eventsGroup).map((key, index) => {
  const data = eventsGroup[key];
  const [first] = data;
  const thumbnails = data.map((record) => record.thumbnail);
  const departments = data.map(((record) => record.macroregion));
  const foto = data.map((record) => record.foto).flat();


  return {
    id: index + 1,
    nombre_galeria: key,
    municipio: first.municipio.trim(),
    departamento: departments,
    comunidad_focalizada: key,
    descripcion: `Esta es la galería de las actividades realizadas en ${key}.`,
    foto,
    type: 'evento',
    tipo_multimedia: 'Fotografía',
    thumbnail: thumbnails.find((t) => t) || '',
  };
});

const base = events.length;

const multimedia = multimediaData.map((record, index) => {
  let photos = record.fotos ? (JSON.parse(record.fotos)).map((p) => p.url) : [];

  photos = photos.map((photo) => {
    if (!isURL(photo, {require_protocol: true})) {
      // TODO: Debe tratarse de una imagen local. Verificar.
      return photo;
    };
    const u = new URL(photo);
    if (u.protocol === 'https:') return photo;
    u.protocol = 'https';
    return u.toString();
  });

  return {
    ...omit(record, ['fotos']),
    id: base + index + 1,
    type: record.tipo_galeria ? record.tipo_galeria.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : 'fotografia',
    foto: photos,
    thumbnail: photos[0] || '',
    tipo_multimedia: record.tipo_galeria || 'Fotografía',
    enlace_video_audio: record.enlace_video_audio?.split(' ') || [],
  };
});

const summary = [...orderBy(multimedia, ['id'], 'desc'), ...events];

writeFileSync(join(__dirname, '..', 'data', 'eventos_multimedia.json'), JSON.stringify(summary));
