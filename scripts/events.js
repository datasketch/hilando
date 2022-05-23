const data = require('../data/eventos.json');

data.map((item) => {
  return {
    ...item,
    // foto: ['url1', 'url2'],
    // foto: [],
    // thumbnail: 'url1' || null
  };
});

