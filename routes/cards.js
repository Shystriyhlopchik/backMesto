const productRouter = require('express').Router();


const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

productRouter.post('/', createCard);
productRouter.get('/', getCards);
productRouter.delete('/:id', deleteCard);
productRouter.put('/:cardId/likes', likeCard);
productRouter.delete('/:cardId/likes', dislikeCard);


module.exports = productRouter;
