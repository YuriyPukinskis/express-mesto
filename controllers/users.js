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
  User.findById(req.params.id)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      switch (err.name) {
        case 'CastError': res.status(400).send({ message: 'Переданы некорректные данные' }); break;
        case 'Error': res.status(404).send({ message: 'Пользователя нет в базе' }); break;
        default: res.status(500).send({ message: 'Произошла ошибка' }); break;
      }
    });
};

module.exports.postUsers = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      switch (err.name) {
        case 'ValidationError': res.status(400).send({ message: 'Введены некорректные данные' }); break;
        default: res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.patchUserData = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      switch (err.name) {
        case 'CastError': res.status(400).send({ message: 'Переданы некорректные данные' }); break;
        case 'Error': res.status(404).send({ message: 'Пользователя нет в базе' }); break;
        default: res.status(500).send({ message: 'Произошла ошибка' }); break;
      }
    });
};

module.exports.patchUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar },
    { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      switch (err.name) {
        case 'CastError': res.status(400).send({ message: 'Переданы некорректные данные' }); break;
        case 'Error': res.status(404).send({ message: 'Пользователя нет в базе' }); break;
        default: res.status(500).send({ message: 'Произошла ошибка' }); break;
      }
    });
};
