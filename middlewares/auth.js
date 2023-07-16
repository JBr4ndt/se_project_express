const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { handleUnauthError } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleUnauthError(req, res);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleUnauthError(req, res, err);
  }

  req.user = payload;

  next();
};
