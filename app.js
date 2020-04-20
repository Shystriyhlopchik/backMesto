const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

app.use(auth);
app.post('/signin', login);
app.post('/signup', createUser);
app.use(express.static(path.join(__dirname, '/public')));
app.use((req, res, next) => {
  req.user = {
    _id: '5e95ec235d8ecc043091212b',
  };
  next();
});
app.use('/', routes);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
