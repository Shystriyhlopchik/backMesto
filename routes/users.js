const productRouter = require('express').Router();

const fs = require('fs');

const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

productRouter.get('/', (req, res)=> {
  res.send(users);
})

productRouter.get('/:id', (req, res) => {
  const user = users.find((item) => item._id === req.params.id);

  if (!user) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  } else {
    res.send(user);
  }
});
module.exports = productRouter;