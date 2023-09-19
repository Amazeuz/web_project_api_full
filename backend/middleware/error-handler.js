const errorHandler = (err, req, res, next) => {
  console.log(err)
  if (!err.statusCode) {
    err.statusCode = 500
  }
  else if (!err.message) {
    err.message = 'Ocorreu um erro no servidor'
  }

  res.status(err.statusCode).send({ message: err.message });
};

module.exports = errorHandler;