// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => { // Общая обработка ошибок
  const status = err.status || 500;
  const message = status === 500 ? 'Internal Server Error' : err.message;
  res.status(status).send({
    error: {
      status,
      message,
    },
  });
  // res.send(err);
};
