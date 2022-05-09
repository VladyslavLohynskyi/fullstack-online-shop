const Router = require("express");
const router = new Router();
const RatingController = require("../controllers/ratingController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/", authMiddleware, RatingController.addRating);
router.get("/", RatingController.getAvgRating);
router.get("/check", authMiddleware, RatingController.getOneRating);

module.exports = router;
