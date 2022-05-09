const Router = require("express");
const userController = require("../controllers/userController");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");
router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/change", checkRole("ADMIN"), userController.changeRole);
router.get("/auth", authMiddleware, userController.check);
router.get("/:criteria", checkRole("ADMIN"), userController.getByCriteria);
router.get("/", checkRole("ADMIN"), userController.getUser);

module.exports = router;
