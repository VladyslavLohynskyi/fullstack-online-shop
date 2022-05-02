const jwt = require("jsonwebtoken");

const { Basket, BasketDevice, Device } = require("../models/models");

class BasketController {
  async incremetCount(req, res) {
    const { deviceId } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const basket = await Basket.findOne({ where: { userId: user.id } });
    await BasketDevice.increment(
      { count: 1 },
      { where: { basketId: basket.id, deviceId } }
    );
    return res.json({ message: " Device added to basket" });
  }
  async decremetCount(req, res) {
    const { deviceId } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const basket = await Basket.findOne({ where: { userId: user.id } });
    const device = await BasketDevice.findOne({
      where: { basketId: basket.id, deviceId },
    });
    if (device.count === 1) {
      return res.json({ message: "Count can not be smaller than 1" });
    }
    await BasketDevice.increment(
      { count: -1 },
      { where: { basketId: basket.id, deviceId } }
    );
    return res.json({ message: " Device remove 1 from basket" });
  }
  async addDevice(req, res) {
    console.log(true);
    try {
      const { deviceId } = req.body;

      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const basket = await Basket.findOne({ where: { userId: user.id } });

      const existDevice = await BasketDevice.findOne({
        where: { basketId: basket.id, deviceId },
      });
      if (!existDevice) {
        const device = await BasketDevice.create({
          basketId: basket.id,
          deviceId,
        });
        return res.json({ message: " Device added to basket", device });
      } else {
        await BasketDevice.increment(
          { count: 1 },
          { where: { basketId: basket.id, deviceId } }
        );
        return res.json({ message: " Device added to basket" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getDevices(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const basket = await Basket.findOne({ where: { userId: user.id } });
      const devices = await BasketDevice.findAll({
        where: { basketId: basket.id },
      });

      const basketArr = [];
      for (let i = 0; i < devices.length; i++) {
        const basketDevice = await Device.findOne({
          where: {
            id: devices[i].deviceId,
          },
        });

        basketArr.push({ ...basketDevice.dataValues, count: devices[i].count });
      }

      return res.json(basketArr);
    } catch (error) {
      console.log(error);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const basket = await Basket.findOne({ where: { userId: user.id } });
      const device = await BasketDevice.findOne({
        where: { deviceId: id, basketId: basket.id },
      });
      if (device) {
        await BasketDevice.destroy({
          where: { deviceId: id, basketId: basket.id },
        });
        return res.json({ message: "Brand deleted", device });
      }
      return res.json({ message: "Brand with this id is not exist" });
    } catch (error) {
      console.log("DELETE basket device ERRORR", error);
    }
  }
  async deleteAll(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const basket = await Basket.findOne({ where: { userId: user.id } });
      const device = await BasketDevice.destroy({
        where: { basketId: basket.id },
      });

      return res.json({ message: "Basket Clear", device });
    } catch (error) {
      console.log("DELETE basket device ERRORR", error);
    }
  }
}

module.exports = new BasketController();
