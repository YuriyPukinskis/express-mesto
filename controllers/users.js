const fs = require('fs');
const path = require('path');
const User = require('../models/user');

let data = [];
const usersFilePath = path.resolve('data', 'users.json');

module.exports.getUsers = (req, res) => {
  try {
    data = fs.readFileSync(usersFilePath);
    res.send(JSON.parse(data));
  } catch (err) {
    res.status(500).send({ message: 'Файл не найден' });
  }
};

module.exports.getUserById = (req, res) => {
  try {
    data = fs.readFileSync(usersFilePath);
  } catch (err) {
    res.status(500).send({ message: 'Файл не найден' });
  }
  const userById = JSON.parse(data).find((item) => item._id === req.params.id);
  if (userById) {
    res.send(userById);
  } else {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
};

module.exports.postUsers = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.patchUserData = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.patchUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { avatar: req.body.avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
