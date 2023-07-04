const ERROR_400 = 400;
const ERROR_404 = 404;
const ERROR_500 = 500;

function handleError(req, res, err) {
  if (err.name === "ValidationError") {
    return res.status(ERROR_400).send({
      message: `invalid data passed to the methods for creating an user or item`,
    });
  }
  if (err.name === "CastError") {
    return res
      .status(ERROR_400)
      .send({ message: `invalid ID passed to the params` });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(ERROR_404).send({
      message: `There is no user or item with the requested id, or the request was sent to a non-existent address`,
    });
  }
  return res
    .status(ERROR_500)
    .send({ message: `An error has occurred on the server` });
}

module.exports = {
  ERROR_400,
  ERROR_404,
  ERROR_500,
  handleError,
};
