const jwt = require('jsonwebtoken');


// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходимая авторицация' });
  }
  req.user = payload;
  next();
};
