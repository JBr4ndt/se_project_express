const User = require("../models/user");
const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

function handleUsersError(req, res, err) {
  if (err.name === "ValidationError") {
    return res.status(ERROR_400).send({
      message: `invalid data passed to the methods for creating an user`,
    });
  }
  if (err.name === "CastError") {
    return res
      .status(ERROR_400)
      .send({ message: `invalid ID passed to the params` });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(ERROR_404).send({
      message: `There is no user with the requested id, or the request was sent to a non-existent address`,
    });
  }
  return res
    .status(ERROR_500)
    .send({ message: `An error has occurred on the server` });
}

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      handleUsersError(req, res, err);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById({ userId })
    .orFail()
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      handleUsersError(req, res, err);
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      handleUsersError(req, res, err);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
