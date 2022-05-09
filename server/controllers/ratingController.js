const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");

const { Rating, Device } = require("../models/models");

class RatingController {
  async addRating(req, res) {
    try {
      const { deviceId, rate } = req.body;

      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const device = await Device.findOne({ where: { id: deviceId } });
      if (!device) {
        return { message: "Error device not exist" };
      }
      const findRating = await Rating.findOne({
        where: { deviceId, userId: user.id },
      });
      let rating;
      if (findRating) {
        rating = await Rating.update(
          { rate },
          { where: { deviceId, userId: user.id } }
        );
      } else {
        rating = await Rating.create({ userId: user.id, deviceId, rate });
      }
      return res.json(rating);
    } catch (error) {
      console.log("adding error", error);
    }
  }
  async getAvgRating(req, res) {
    try {
      const { deviceId } = req.query;
      const device = await Device.findOne({ where: { id: deviceId } });
      if (!device) {
        return res.json({ message: "Error device not exist" });
      }
      const avgRating = await Rating.findOne({
        where: { deviceId },
        attributes: [[Sequelize.fn("AVG", Sequelize.col("rate")), "avgRating"]],
      });
      return res.json(avgRating);
    } catch (error) {
      console.log("get error AVG", error);
    }
  }
  async getOneRating(req, res) {
    try {
      const { deviceId } = req.query;
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const rating = await Rating.findOne({
        where: { deviceId, userId: user.id },
      });
      if (!rating) {
        return res.json({ message: "You havent estimate this product yet" });
      }
      return res.json(rating);
    } catch (error) {
      console.log("get error Rating", error);
    }
  }
}

module.exports = new RatingController();
