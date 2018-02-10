const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/news', require('./news'));
router.use('/transactions', require('./transaction'));
router.use('/coins', require('./coins'));

// error handler
router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
