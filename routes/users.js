const router = require("express").Router();
const auth = require("../middlewares/auth");

const { getCurrentUser, updateUser } = require("../controllers/users");

router.get("/me", auth, getCurrentUser);
router.get("/me", auth, updateUser);

module.exports = router;
