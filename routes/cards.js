const productRouter = require('express').Router();

const fs = require('fs');

const cards = JSON.parse(fs.readFileSync('./data/cards.json', 'utf8'));


productRouter.get('/', (req, res) => {
  res.send(cards);
})

module.exports = productRouter;