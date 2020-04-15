const productRouter = require('express').Router();


const {
  createUser, getUsers, getUser, patchMe, patchAvatar,
} = require('../controllers/users');

productRouter.post('/', createUser);// Внесение нового пользователя в БД
productRouter.get('/', getUsers);// Получение всех пользователей из БД
productRouter.get('/:id', getUser);// Получение данных пользователя по id из БД
productRouter.patch('/me', patchMe);// Обновление информации профиля пользователя
productRouter.patch('/me/avatar', patchAvatar); // Обновление аватара


module.exports = productRouter;
