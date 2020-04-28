require('dotenv').config(); // добавил env переменные

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const routes = require('./routes/routes.js');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const settings = require('./appconfig'); // ! объеденить
const { login, createUser } = require('./controllers/users');
const { userValidator, loginValidator } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { mongooseConnect } = require('./appconfig'); // ! Объеденить

const port = settings.PORT;
const app = express();

app.use(helmet()); // док: https://www.npmjs.com/package/helmet

// инициализация мидлваров
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger); // логгер запросов

// подключение к БД
mongooseConnect();

// краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роуты
app.post('/signin', loginValidator, login);
app.post('/signup', userValidator, createUser);
app.use(auth);
app.use('/', routes);

// обработка ошибок
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(error);

// Сообщение в консоли
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});
