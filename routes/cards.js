const router = require('express').Router();

const {
  getCards, postCard, deleteCard, likeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', postCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId', deleteCard);

module.exports = router;
