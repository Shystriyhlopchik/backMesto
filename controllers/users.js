const User = require('../models/user');

module.exports.createUser = (req, res) => {
  console.log("dsds>>", req.body);
  //const { name, about, avatar } = req.body;
  const name = "Dima Andreev";
  const about = "Student";
  const avatar = "http://biographi.com/.image/t_share/dsdsds.jpg";
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}