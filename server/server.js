const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const db = require('./db');
const seedData = require('./seed');
const coinDataUpdate = require('../cryptocompareUpdate/UpdateCoinDB');

// serve the index.js create react app - change in production.  should point to build
// app.use(express.static(path.join(__dirname, '../client')));
// prod
// app.use(express.static(path.join(__dirname, 'build')));

// use for testing purposes
// dev
// app.use(require('body-parser').json());

app.use('/api', require('./routes/index'));

// dev
// app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../client/public/index.html')));
// prod
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../client', 'build', 'index.html')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './public/index.html'));
// });

// production
app.get('*', (req, res) => {
  const index = path.join(__dirname, '../client', 'build', 'index.html');
  res.sendFile(index);
});

// sync database before starting server// dev
if (process.env.SYNC === 'true') {
  db.sync()
    .then(() => Promise.resolve(coinDataUpdate()))
    .then(() => seedData.seed())
    .catch(err => console.log(err));
}

// prod
if (process.env.SYNCPROD === 'true') {
  db.sync()
    .then(() => Promise.resolve(coinDataUpdate()))
    .catch(err => console.log(err));
}

app.listen(port, () => console.log(`Listening on port ${port}`));

// for testing purposes
module.exports = app;
