const express = require('express');
const routesCards = require('./routes/cards');
const routesUsers = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.static(`${__dirname}/public`));
app.listen(PORT, () => {

});

app.use('/', routesCards);
app.use('/', routesUsers);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
