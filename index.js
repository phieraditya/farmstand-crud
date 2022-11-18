const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const port = process.env.PORT || 3000;

const Product = require('./models/product');
const Farm = require('./models/farm');

mongoose
  .connect('mongodb://localhost:27017/farmStand')
  .then(() => {
    console.log('MONGO CONNECTION OPEN!!');
  })
  .catch((err) => {
    console.log('MONGO CONNECTION ERROR!!');
    console.log(err);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/farms', require('./routes/farmRoutes'));
app.use('/products', require('./routes/productRoutes'));

app.listen(port, () => {
  console.log(`APP IS LISTENING ON PORT ${port}!`);
});
