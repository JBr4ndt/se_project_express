const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");
const auth = require("../middlewares/auth");
const { login, createUser } = require("../controllers/users");
const { ERROR_404 } = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/users", auth, user);

router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "Requested resource not found" });
});

module.exports = router;
