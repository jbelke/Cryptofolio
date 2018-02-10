const db = require('../db').models;

const getCryptoCompareId = (symbol) => {
  const id = db.Coins.findAll({ where: { symbol }, raw: true })
    .then(result => result[0])
    .catch(err => console.log(err));

  return id;
};

module.exports = getCryptoCompareId;
