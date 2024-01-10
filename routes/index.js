const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");
const auth = require("../middlewares/auth");
const { login, createUser } = require("../controllers/users");
const NotFoundError = require("../utils/errors/NotFoundError");
const {
  validateUserInfo,
  validateLoginUser,
} = require("../middlewares/validation");

router.use("/items", clothingItem);
router.use("/users", auth, user);

router.post("/signin", validateLoginUser, login);
router.post("/signup", validateUserInfo, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Router resource not found."));
});

module.exports = router;
