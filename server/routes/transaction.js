const router = require('express').Router();
const db = require('../db').models;
const utility = require('../utility/utility');

router.get('/:firebaseUID', (req, res, next) => {
  Promise.all([utility.getUserId(req.params.firebaseUID)])
    .then((result) => {
      db.UserTransactions.findAll({
        where: { userId: result[0].id },
        include: [{
          model: db.Coins,
        }],
      })
        .then(transactions => res.send(transactions))
        .catch(next);
    })
    .catch(next);
});

// create transaction
router.post('/create', (req, res, next) => {
  Promise.all([
    utility.getCryptoCompareId(req.body.coinName),
    utility.getUserId(req.body.firebaseUID),
  ])
    .then(([coinData, userData]) => {
      // save transaction to the database
      const saveTrx = db.UserTransactions.create({
        coinName: coinData.symbol,
        coinAmount: req.body.coinAmount,
        buyPrice: req.body.buyPrice,
        sellPrice: req.body.sellPrice,
        userId: userData.id,
        coinId: coinData.id,
        transactionDate: req.body.date,
      });

      return saveTrx
        .then((result) => {
          // return the full list of the transaction
          db.UserTransactions.findAll({
            where: { userId: result.userId },
            include: [{
              model: db.Coins,
            }],
          })
            .then(transactions => res.send(transactions))
            .catch(next);
        })
        .catch(next);
    })
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


module.exports = router;
