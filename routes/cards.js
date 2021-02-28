const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const cardsFilePath = path.resolve('data', 'cards.json');

router.get('/cards', (req, res) => {
  try {
    const data = fs.readFileSync(cardsFilePath);
    res.send(JSON.parse(data));
  } catch (err) {
    res.status(500).send({ message: 'Файл не найден' });
  }
});

module.exports = router;
