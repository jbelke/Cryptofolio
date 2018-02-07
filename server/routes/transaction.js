const router = require('express').Router();
const db = require('../db').models;

router.get('/:userId', (req, res, next) => {
  db.UserTransactions.findAll({ where: { userId: req.params.userId } })
    .then(transactions => res.send(transactions))
    .catch(next);
});

// create transaction
router.post('/create', (req, res, next) => {
  db.UserTransactions.create({
    coinName: req.body.coinName,
    coinAmount: req.body.coinAmount,
    buyPrice: req.body.buyPrice,
    sellPrice: req.body.sellPrice,
    userId: req.body.userId,
    coinId: req.body.coinId,
  })
    .then(transaction => res.send(transaction))
    .catch(next);
});

// delete transaction
router.delete('/:id', (req, res, next) => {
  db.UserTransactions.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.sendStatus(200))
    .catch(next);
});


// update transactions

module.exports = router;
