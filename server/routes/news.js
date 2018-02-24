const router = require('express').Router();
const NewsAPI = require('newsapi');
const key = require('../env/development').NEWS_API;
// prod
// const key = process.env.NEWS_API;

const newsapi = new NewsAPI(key);
router.get('/topHeadlines', (req, res, next) => {
  const options = {
    q: req.body.coinName || 'crypto',
    language: 'en',
    pageSize: 10,
  };

  newsapi.v2.topHeadlines(options)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
});

module.exports = router;
