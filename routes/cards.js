const productRouter = require('express').Router();
const { cardValidator, mongooseObjectIdValidator } = require('../middlewares/validation'); // подключение функций для валидации запросов

const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

productRouter.post('/', cardValidator, createCard); // добавляем новую карточку
productRouter.get('/', getCards); // получаем из БД все  карточки
productRouter.delete('/:id', mongooseObjectIdValidator, deleteCard); // удаление личных карточек пользователя
productRouter.put('/:cardId/likes', mongooseObjectIdValidator, likeCard); // установка лайка
productRouter.delete('/:cardId/likes', mongooseObjectIdValidator, dislikeCard); // снятие лайка


module.exports = productRouter;
