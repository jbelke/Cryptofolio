const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// serve the index.js create react app - change in production
app.use(express.static(path.join(__dirname, 'client/index.js')));

app.get('/api', (req, res) => {
  res.send({ express: 'Hello'})
});

//  any other routes will send error 404
app.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});


app.listen(port, () => console.log(`Listening on port ${port}`));
