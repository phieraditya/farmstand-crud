const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/shopApp')
  .then(() => {
    console.log('MONGO CONNECTION OPEN!!');
  })
  .catch((ERR) => {
    console.log('MONGO CONNECTION ERROR!!');
    console.log(err);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/kopi', (req, res) => {
  res.send('Es Kopi Susu');
});

app.listen(3000, () => {
  console.log('APP IS LISTENING ON PORT 3000!');
});
