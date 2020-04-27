const productRouter = require('express').Router();
const { mongooseObjectIdValidator, avatarValidator, profileValidator } = require('../middlewares/validation');

const {
  getUsers, getUser, patchMe, patchAvatar,
} = require('../controllers/users');

productRouter.get('/', getUsers);// Получение всех пользователей из БД
productRouter.get('/:id', mongooseObjectIdValidator, getUser);// Получение данных пользователя по id из БД
productRouter.patch('/me', profileValidator, patchMe);// Обновление информации профиля пользователя
productRouter.patch('/me/avatar', avatarValidator, patchAvatar); // Обновление аватара


module.exports = productRouter;
