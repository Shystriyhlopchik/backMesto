const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const routes = require('./routes/routes.js');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.post('/signin', login);
app.post('/signup', createUser);
app.use(helmet());
app.use(auth);
app.use('/', routes);
app.use((err, res) => { // Общая обработка ошибок
  if (!err.statusCode) {
    res
      .status(500)
      .send({ message: 'Internal Server Error' });
  }
  res
    .status(`${err.statusCode}`)
    .send({ message: err.message });
});
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
