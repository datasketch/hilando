require('dotenv').config();
const axios = require('axios');
const fs = require('fs/promises');
const path = require('path');

const req = axios.create({
  baseURL: 'https://hilando.datasketch.co/api/v1/db/data/noco/Proyecto',
  headers: {
    'xc-auth': process.env.NOCODB_TOKEN,
  },
});

const getFilePath = (filename) => {
  return path.join(__dirname, '..', 'data', filename);
};

async function run() {
  const communities = await req.get('/comunidades?limit=100');
  const events = await req.get('/eventos?limit=100');
  const trrs = await req.get('/fichas_municipio');
  fs.writeFile(
      getFilePath('comunidades-focalizadas.json'),
      JSON.stringify(communities.data.list),
  );
  fs.writeFile(
      getFilePath('eventos.json'),
      JSON.stringify(events.data.list),
  );
  fs.writeFile(
      getFilePath('_territorios.json'),
      JSON.stringify(trrs.data.list),
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
