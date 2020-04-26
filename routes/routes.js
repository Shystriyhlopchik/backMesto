const productRouter = require('express').Router();
const express = require('express');
const NotFoundError = require('../errors/not-found-err');

const app = express();
const cards = require('./cards.js');
const users = require('./users.js');

productRouter.use('/cards', cards)
  .use('/users', users)
  .use('*', (req, res, next) => {
    next(new NotFoundError('404 Not Found'));
  });

app.use('/', productRouter);

module.exports = productRouter;
