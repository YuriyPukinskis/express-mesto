const router = require('express').Router();
const fs = require('fs');
const path = require('path');

let data = [];
const usersFilePath = path.resolve('data', 'users.json');

router.get('/users', (req, res) => {
  try {
    data = fs.readFileSync(usersFilePath);
    res.send(JSON.parse(data));
  } catch (err) {
    res.status(500).send({ message: 'Файл не найден' });
  }
});

router.get('/users/:id', (req, res) => {
  try {
    data = fs.readFileSync(usersFilePath);
  } catch (err) {
    res.status(500).send({ message: 'Файл не найден' });
  }
  res.send(JSON.parse(data).find((item) => item._id === req.params.id));
  res.status(404).send({ message: 'Нет пользователя с таким id' });
});

module.exports = router;
