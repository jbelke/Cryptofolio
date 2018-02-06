const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;
const db = require('./db');
const seedData = require('./seed');
const coinData = require('../cryptocompareUpdate/UpdateCoinDB');

// serve the index.js create react app - change in production.  should point to build
app.use(express.static(path.join(__dirname, '../client')));

// use for testing purposes
app.use(require('body-parser').json());

app.get('/api', (req, res) => {
  res.send({ express: 'Hello' });
});

app.use('/', (req, res) => res.sendFile(path.join(__dirname, '/src/index.js')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

// sync database before starting server
db.sync()
  .then(() => {
    Promise.resolve(coinData());
    seedData.seed();
  })
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Listening on port ${port}`));
