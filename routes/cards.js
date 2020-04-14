const productRouter = require('express').Router();
const path = require('path');
const fs = require('fs');


const { createCard, getCards, deleteCard } = require('../controllers/cards');

productRouter.post('/', createCard);
productRouter.get('/', getCards);
productRouter.delete('/:id', deleteCard);
// const promise = new Promise ((resolve, reject) => {
//   const cardspath = path.join(__dirname, '../data/cards.json');
//   resolve(cardspath);
// });
// promise.then(pathCards => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(pathCards, 'utf8', (err, data) => {
//       // eslint-disable-next-line prefer-promise-reject-errors
//       if (err) reject(`Ошибка чтения файла: ${pathCards}`);
//       else resolve(data);
//     });
//   });
// })
//   .then(data => {
//     const cards = JSON.parse(data);
//     return cards;
//   })
//   .then(data => {
//     productRouter.get('/', (req, res) => {
//       res.send(data);
//     });
//   })
//   .catch((err) => console.log('Error!!! \nПодробности: ', err));


module.exports = productRouter;
