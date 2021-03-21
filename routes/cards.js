const router = require('express').Router();

const {
  getCardById, postCard, deleteCard, likeCard,
} = require('../controllers/cards');

router.get('/cards/:cardId', getCardById);
router.post('/cards', postCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId', deleteCard);

module.exports = router;
