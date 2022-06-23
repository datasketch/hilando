const path = require('path');

const getFilePath = (filename) => {
  return path.join(__dirname, '..', 'data', filename);
};

module.exports = {
  getFilePath,
};
