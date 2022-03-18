const fs = require('fs');
const path = require('path');

const rawDataPath = path.join(__dirname, '..', 'scripts', 'raw', 'eventos.json');
const transformedDataPath = path.join(__dirname, '..', 'data', 'eventos.json');
fs.readFile(rawDataPath, 'utf-8', transformData);

function transformData(err, data) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  const dataObject = JSON.parse(data);
  const transformedData = dataObject.map((record) => ({
    ...record,
    imagen: record.imagen.match(/\((.*?)\)/) ? record.imagen.match(/\((.*?)\)/)[1] : '',
  }));
  fs.writeFileSync(transformedDataPath, JSON.stringify(transformedData));
}

