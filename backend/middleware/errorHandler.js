const ErrorMessage = require("../services/errorMessage");

function errorRouteHandler(req, res, next) {
  const error = new Error(`Cannot ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || ErrorMessage.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({ error: message });
}

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  errorRouteHandler,
  errorHandler,
  asyncHandler,
};
