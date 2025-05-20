const fs = require('fs');
const csv = require('csv-parser');

async function getMicrodataForTracts(tractCodes) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream('./data/microdata_setor_censitario.csv')
      .pipe(csv({ separator: ';' })) // or ',' depending on your file
      .on('data', (row) => {
        if (tractCodes.includes(row.Cod_setor)) {
          results.push(row);
        }
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', err => reject(err));
  });
}

module.exports = { getMicrodataForTracts };