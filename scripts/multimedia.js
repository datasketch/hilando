// export module fs.writefilesync
const {writeFileSync} = require('fs');

// export module path.join
const {join} = require('path');

// import events and multimedia json data

// events data
const eventsData = require('../data/eventos.json');
// console.log(eventsData); check

// multimedia data
const multimediaData = require('../data/multimedia.json');
// console.log(multimediaData); check

// use spread operator to merge events and multimedia data
const newData = [...eventsData, ...multimediaData];
// console.log(newData); check

// add new property to each object in newData
newData.forEach((item, index) => {
  item.id = index + 1;
  item.type = item.tipo_multimedia ? item.tipo_multimedia.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : 'evento';
  item.tipo_multimedia = item.tipo_multimedia ? item.tipo_multimedia : 'Fotografía';
});
// console.log(newData); check

// write new data to new file
writeFileSync(join(__dirname, '..', 'data', 'multimediaCOPY.json'), JSON.stringify(newData));
