const Router = require("express");
const router = new Router();
const BasketController = require("../controllers/basketController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/", authMiddleware, BasketController.addDevice);
router.get("/", authMiddleware, BasketController.getDevices);
router.delete("/:id", authMiddleware, BasketController.delete);
router.delete("/", authMiddleware, BasketController.deleteAll);
router.put("/increment", authMiddleware, BasketController.incremetCount);
router.put("/decrement", authMiddleware, BasketController.decremetCount);

module.exports = router;
