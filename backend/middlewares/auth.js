const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const authUser = (req, res, next) => {
  // const { authorization } = req.headers;
  const { token } = req.cookies;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   return next(new UnauthorizedError('Необходима авторизация'));
  // }
  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  // const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = authUser;
