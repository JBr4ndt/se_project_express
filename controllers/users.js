const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  handleError,
  handleUnauthError,
  ERROR_404,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

const updateUser = (req, res) => {
  //const { userId } = req.params;
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(ERROR_404).send({ message: "User not found" });
      }

      return res.status(200).send({ data: updatedUser });
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(409).send({ message: "Email is already registered" });
      }
      return bcrypt
        .hash(password, 10)
        .then((hash) => User.create({ name, avatar, email, password: hash }))
        .then((user) => {
          res.status(201).send({
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
          });
        });
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      return handleUnauthError(req, res, err);
    });
};

module.exports = {
  getCurrentUser,
  updateUser,
  createUser,
  login,
};
