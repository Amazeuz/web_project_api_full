const errorHandler = (err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500
    err.message = 'Ocorreu um erro no servidor'
  }

  res.status(err.statusCode).send({ message: err.message });
};

module.exports = errorHandler;