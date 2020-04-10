const productRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

const userspath = path.join(__dirname, '../data/users.json');


fs.readFile(userspath, 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  try {
    const users = JSON.parse(data);

    productRouter.get('/', (req, res) => {
      res.send(users);
    });
    productRouter.get('/:id', (req, res) => {
      const user = users.find((item) => item._id === req.params.id);
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.send(user);
      }
    });
  } catch (e) {
    console.log('Извините, произошла ошибка.');
    console.log(e.name);
    console.log(e.message);
    console.log(e.stack);
  }
});


module.exports = productRouter;
