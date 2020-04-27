const { celebrate, Joi } = require('celebrate');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');


// сообщения ошибок валлидации
const errorsMessage = {
  about: new BadRequestError('"about" не соответствует формату'),
  name: new BadRequestError('Длина имени не должна превышать 30 символов и быть не короче 2 символов'),
  avatar: new BadRequestError('Ошибка в поле "avatar". URL не соответствует формату.'),
  email: new BadRequestError('Строка, обязательное поле, должно соответствовать паттерну почты'),
  password: new BadRequestError('Пароль должен состоять не менее чем из 8 символов(максмум 24).'),
  link: new BadRequestError('Ошибка URL'),
  id: new BadRequestError('Ошибка типа'),
  login: new UnauthorizedError('Почта или пароль введенны с ошибкой'),
};

// валидация новог пользователя
module.exports.userValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .error(errorsMessage.name),
    about: Joi.string().required().min(2).max(30)
      .error(errorsMessage.about),
    avatar: Joi.string().required()
      .regex(/^(https?):\/\/(w{3}\.)?(?!www)(([А-ЯЁа-яёA-Za-z0-9_-]+\.[А-ЯЁа-яёA-Za-z0-9_-]+(\.[А-ЯЁа-яёA-Za-z_-]+){0,2})|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))(:\d{2,5})?(\/[A-Za-z0-9/\-_.#:?&~/=]*)?$/)
      .error(errorsMessage.avatar),
    email: Joi.string().required().email()
      .error(errorsMessage.email),
    password: Joi.string().required().min(8)
      .regex(/[a-z0-9-+_=&?!.,%^:;<>#@*()~'"|\\/]{8,24}/i)
      .error(errorsMessage.password),
  }),
});

// валидация логина
module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .error(errorsMessage.login),
    password: Joi.string().required().min(8)
      .error(errorsMessage.login),
  }),
});

// валидация профиля
module.exports.profileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .error(errorsMessage.name),
    about: Joi.string().required().min(2).max(30)
      .error(errorsMessage.about),
  }),
});

// валидация аватара
module.exports.avatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
      .regex(/^(https?):\/\/(w{3}\.)?(?!www)(([А-ЯЁа-яёA-Za-z0-9_-]+\.[А-ЯЁа-яёA-Za-z0-9_-]+(\.[А-ЯЁа-яёA-Za-z_-]+){0,2})|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))(:\d{2,5})?(\/[A-Za-z0-9/\-_.#:?&~/]*)?$/)
      .error(errorsMessage.avatar),
  }),
});

// валидация новой карточки
module.exports.cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .error(errorsMessage.name),
    link: Joi.string().required()
      .regex(/^(https?):\/\/(w{3}\.)?(?!www)(([А-ЯЁа-яёA-Za-z0-9_-]+\.[А-ЯЁа-яёA-Za-z0-9_-]+(\.[А-ЯЁа-яёA-Za-z_-]+){0,2})|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))(:\d{2,5})?(\/[A-Za-z0-9/\-_.#:?&~/]*)?$/)
      .error(errorsMessage.link),
  }),
});
