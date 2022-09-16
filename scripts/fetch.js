require('dotenv').config();
const axios = require('axios');
const fs = require('fs/promises');
const {getFilePath} = require('./utils');

const req = axios.create({
  baseURL: 'https://hilando.datasketch.co/api/v1/db/data/noco/Proyecto',
  headers: {
    'xc-auth': process.env.NOCODB_TOKEN,
  },
});

async function run() {
  const communities = await req.get('/comunidades?limit=100');
  const events = await req.get('/eventos?limit=100');

  const eventsMunicipalities = await req.get('/eventos_municipios?limit=100');
  const trrs = await req.get('/fichas_municipio?limit=100');
  const publications = await req.get('/publicaciones?limit=100');
  const multimedia = await req.get('/multimedia?limit=100');
  fs.writeFile(
      getFilePath('comunidades-focalizadas.json'),
      JSON.stringify(communities.data.list),
  );
  fs.writeFile(
      getFilePath('eventos.json'),
      JSON.stringify(events.data.list),
  );
  fs.writeFile(
      getFilePath('eventos_municipios.json'),
      JSON.stringify(eventsMunicipalities.data.list),
  );
  fs.writeFile(
      getFilePath('territorios.json'),
      JSON.stringify(trrs.data.list),
  );
  fs.writeFile(
      getFilePath('publicaciones.json'),
      JSON.stringify(publications.data.list),
  );
  fs.writeFile(
      getFilePath('multimedia.json'),
      JSON.stringify(multimedia.data.list),
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
