const Card = require('../models/card');

module.exports.getCardById = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      switch (err.message) {
        case 'NotValidId': res.status(404).send({ message: 'Карточки нет в базе' }); break;
        default: res.status(500).send({ message: 'Произошла ошибка' }); break;
      }
    });
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      switch (err.name) {
        case 'ValidationError': res.status(400).send({ message: 'Введены некорректные данные' }); break;
        default: res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      switch (err.name) {
        case 'CastError': res.status(400).send({ message: 'Переданы некорректные данные' }); break;
        case 'Error': res.status(404).send({ message: 'Карточки нет в базе' }); break;
        default: res.status(500).send({ message: 'Произошла ошибка' }); break;
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .orFail(new Error('NotValidId'))
    .catch((err) => {
      switch (err.name) {
        case 'CastError': res.status(400).send({ message: 'Переданы некорректные данные' }); break;
        case 'Error': res.status(404).send({ message: 'Карточки нет в базе' }); break;
        default: res.status(500).send({ message: 'Произошла ошибка' }); break;
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      switch (err.name) {
        case 'CastError': res.status(400).send({ message: 'Переданы некорректные данные' }); break;
        case 'Error': res.status(404).send({ message: 'Карточки нет в базе' }); break;
        default: res.status(500).send({ message: 'Произошла ошибка' }); break;
      }
    });
};
