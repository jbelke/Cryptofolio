const router = require('express').Router();
const db = require('../db').models;

router.get('/', (req, res, next) => {
  db.Coins.findAll({})
    .then(coinList => res.send(coinList))
    .catch(next);
});

module.exports = router;
