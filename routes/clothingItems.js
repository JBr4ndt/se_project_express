const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateClothingItem,
  validateUserAndItemID,
} = require("../middlewares/validation");
const {
  getItems,
  createItem,
  deleteItem,
  updateItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.post("/", auth, validateClothingItem, createItem);

router.put("/:itemId", auth, updateItem);

router.delete("/:itemId", auth, validateUserAndItemID, deleteItem);

router.put("/:itemId/likes", auth, validateUserAndItemID, likeItem);

router.delete("/:itemId/likes", validateUserAndItemID, auth, dislikeItem);

module.exports = router;
