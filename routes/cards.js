const router = require('express').Router();

const {
  getCardById, postCard, deleteCard, checkCard, getCards,
} = require('../controllers/cards');

router.get('/cards/:cardId', getCardById);
router.get('/cards', getCards);
router.post('/cards', postCard);
router.put('/cards/:cardId/likes', checkCard);
router.delete('/cards/:cardId', deleteCard);

module.exports = router;
