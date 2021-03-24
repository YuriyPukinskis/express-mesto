const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routesCards = require('./routes/cards');
const routesUsers = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.listen(PORT, () => {

});
app.use((req, res, next) => {
  req.user = {
    _id: '605ba923445ccd26bc4cf860',
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routesCards);
app.use('/', routesUsers);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
