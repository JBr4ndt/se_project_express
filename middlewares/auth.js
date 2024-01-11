const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authorization required");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "your-secret-key"
    );
  } catch (err) {
    console.error(err);
    throw new UnauthorizedError("Authorization required");
  }

  req.user = payload;

  next();
};
