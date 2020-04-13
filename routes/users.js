const productRouter = require('express').Router();
//const path = require('path');
const mongoose = require('mongoose');

const { createUser } = require('../controllers/users');

productRouter.post('/', (req, res)=> {
  console.log(req.body);
  createUser(req, res);
});
// const fs = require('fs');

// const promise = new Promise((resolve, reject) => {
//   const userspath = path.join(__dirname, '../data/users.json');
//   resolve(userspath);
// });

// promise.then(pathUser => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(pathUser, 'utf8', (err, data) => {
//       // eslint-disable-next-line prefer-promise-reject-errors
//       if (err) reject(`Ошибка чтения файла: ${pathUser}`);
//       else resolve(data);
//     });
//   });
// })

//   .then(dataUsers => {
//     const users = JSON.parse(dataUsers);
//     return users;
//   })
//   .then(parseUsers => {
//     productRouter.get('/', (req, res) => {
//       res.send(parseUsers);
//     });
//     productRouter.get('/:id', (req, res) => {
//       const user = parseUsers.find((item) => item._id === req.params.id);
//       if (!user) {
//         res.status(404).send({ message: 'Нет пользователя с таким id' });
//       } else {
//         res.send(user);
//       }
//     });
//   })
//   .catch((err) => console.log('Error!!! \nПодробности: ', err));


module.exports = productRouter;
