const productRouter = require('express').Router();
const express = require('express');
const app = express();

const cards = require('./cards.js');
const users = require('./users.js');


productRouter.use("/cards", cards)
            .use("/users", users)
            .use('*', (req, res) => {
              res.status(404).send({ message: 'Запрашиваемый ресурс не найден'
              });
            });

app.use("/", productRouter);

module.exports = productRouter;