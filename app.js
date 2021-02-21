const express = require('express');
const users = require('./data/users.json');
const cards = require('./data/cards.json')

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.static(__dirname + '/public'));
app.listen(PORT, () => {

});

  app.get('/users', (req, res) => {
    res.send(users);
  });
  app.get('/cards', (req, res) => {
    res.send(cards);
  });
  app.get('/users/:id', (req, res) => {
    for(let i=0;i<users.length;i++){
      if(req.params.id===users[i]._id){
        res.send(users[i]);
        return;
      }
    }
    res.send({   "message": "Нет пользователя с таким id"  });
  });
  app.get('*', function(req, res){
    res.status(404).send({   "message": "Запрашиваемый ресурс не найден"  });
  });