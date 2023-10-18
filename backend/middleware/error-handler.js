const InternalServerError = require('../errors/InternalServerError');

const errorHandler = (err, req, res, next) => {
  if (!err.statusCode && !err.message) {
    throw new InternalServerError('Ocorreu um erro no servidor');
  }

  res.status(err.statusCode).send({ message: err.message });
};

module.exports = errorHandler;
