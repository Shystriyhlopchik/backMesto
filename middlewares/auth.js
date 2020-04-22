const jwt = require('jsonwebtoken');


// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { autorization } = req.headers;
  if (!autorization || !autorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходимая авторицация' });
  }
  const token = autorization.replace('Bearer ', '');
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
