const ClothingItem = require("../models/clothingItem");
const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

function handleClothingItemsError(req, res, err) {
  if (err.name === "ValidationError") {
    return res.status(ERROR_400).send({
      message: `invalid data passed to the methods for creating or updating an item`,
    });
  }
  if (err.name === "CastError") {
    return res
      .status(ERROR_400)
      .send({ message: `invalid ID passed to the params` });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(ERROR_404).send({
      message: `There is no clothing item with the requested id, or the request was sent to a non-existent address`,
    });
  }
  return res
    .status(ERROR_500)
    .send({ message: `An error has occurred on the server` });
}

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      handleClothingItemsError(req, res, err);
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      handleClothingItemsError(req, res, err);
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      handleClothingItemsError(req, res, err);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => {
      res.status(200).send({ message: "Item successfully deleted" });
    })
    .catch((err) => {
      handleClothingItemsError(req, res, err);
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      handleClothingItemsError(req, res, err);
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      handleClothingItemsError(req, res, err);
    });
};

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
