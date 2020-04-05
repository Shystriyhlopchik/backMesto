const productRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

const cardspath = path.join(__dirname, '../data/cards.json');

fs.readFile(cardspath, 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  try {
    const cards = JSON.parse(data);

    productRouter.get('/', (req, res) => {
      res.send(cards);
    });
  } catch (e) {
    console.log('Извините, произошла ошибка.');
    console.log(e.name);
    console.log(e.message);
    console.log(e.stack);
  }
});


module.exports = productRouter;
