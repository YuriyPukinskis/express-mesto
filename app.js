const express = require('express');
const fs = require('fs');
const path = require('path');

let data = [];
const usersFilePath = path.resolve('data', 'users.json');
const cardsFilePath = path.resolve('data', 'cards.json');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.static(`${__dirname}/public`));
app.listen(PORT, () => {

});

app.get('/users', (req, res) => {
  try {
    data = fs.readFileSync(usersFilePath);
    res.send(JSON.parse(data));
  } catch (err) {
    res.status(500).send({ message: 'Файл не найден' });
  }
});

app.get('/cards', (req, res) => {
  try {
    data = fs.readFileSync(cardsFilePath);
    res.send(JSON.parse(data));
  } catch (err) {
    res.status(500).send({ message: 'Файл не найден' });
  }
});

app.get('/users/:id', (req, res) => {
  try {
    data = fs.readFileSync(usersFilePath);
  } catch (err) {
    res.status(500).send({ message: 'Файл не найден' });
  }
  for (let i = 0; i < JSON.parse(data).length; i += 1) {
    if (req.params.id === JSON.parse(data)[i]._id) {
      res.send(JSON.parse(data)[i]);
      return;
    }
  }
  res.status(404).send({ message: 'Нет пользователя с таким id' });
});

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
