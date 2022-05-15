const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo, Rating } = require("../models/models");
const ApiError = require("../error/ApiError");
const fs = require("fs").promises;
const Sequelize = require("../db");
const { QueryTypes } = require("sequelize");

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;

      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      let resultInfo;
      if (info.length != 0) {
        const parseInfo = JSON.parse(info);

        resultInfo = parseInfo.map((element) => {
          DeviceInfo.create({
            title: element.title,
            description: element.description,
            deviceId: device.id,
          });
        });
      }

      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest("Device creating Error " + error.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id, name, price, brandId, typeId, img, info } = req.body;
      const device = await Device.findOne({ where: { id } });
      let fileName;
      try {
        const { img } = req.files;
        fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));
        await fs.unlink(path.resolve(__dirname, "..", "static", device.img));
      } catch (error) {
        fileName = device.img;
      }

      await Device.update(
        { name, price, brandId, typeId, img: fileName },
        { where: { id } }
      );
      if (info.length != 0) {
        const parseInfo = JSON.parse(info);

        parseInfo.map((element) => {
          if (element.create) {
            DeviceInfo.create({
              title: element.title,
              description: element.description,
              deviceId: device.id,
            });
          } else {
            DeviceInfo.update(
              {
                title: element.title,
                description: element.description,
              },
              { where: { deviceId: device.id, id: element.id } }
            );
          }
        });
      }

      return res.json({ message: "Device is updated" });
    } catch (error) {
      next(ApiError.badRequest("Device updating Error " + error.message));
    }
  }
  async getAll(req, res) {
    let { brandId, typeId, value, filter, limit, page } = req.query;
    const [criteria, sortBy] = filter.split(" ");
    page = page || 1;

    limit = limit || 9;

    let offset = page * limit - limit;
    let totalDevices;

    let devices;
    if (!brandId && !typeId) {
      devices = await Sequelize.query(
        `SELECT id, name, price, rating, img, "createdAt", "updatedAt", "typeId", "brandId",(SELECT AVG(rate) FROM ratings WHERE "deviceId" = devices.id )AS "AvgRating"
        FROM devices WHERE name LIKE '${value}%' ORDER BY ${criteria} ${sortBy} Limit ${limit} offset ${offset}`,
        { type: QueryTypes.SELECT }
      );
      totalDevices = await Device.count({ where: { name: value } });
    }
    if (brandId && !typeId) {
      devices = await Sequelize.query(
        `SELECT id, name, price, rating, img, "createdAt", "updatedAt", "typeId", "brandId",(SELECT AVG(rate) FROM ratings WHERE "deviceId" = devices.id )AS "AvgRating"
        FROM devices WHERE "brandId"=${brandId} AND name LIKE '${value}%' ORDER BY ${criteria} ${sortBy}  Limit ${limit} offset ${offset}`,
        { type: QueryTypes.SELECT }
      );
      totalDevices = await Device.count({ where: { brandId, name: value } });
    }
    if (!brandId && typeId) {
      devices = await Sequelize.query(
        `SELECT id, name, price, rating, img, "createdAt", "updatedAt", "typeId", "brandId",(SELECT AVG(rate) FROM ratings WHERE "deviceId" = devices.id )AS "AvgRating"
        FROM devices WHERE "typeId"=${typeId} AND name LIKE '${value}%' ORDER BY ${criteria} ${sortBy}  Limit ${limit} offset ${offset}`,
        { type: QueryTypes.SELECT }
      );
      totalDevices = await Device.count({ where: { typeId, name: value } });
    }
    if (brandId && typeId) {
      devices = await Sequelize.query(
        `SELECT id, name, price, rating, img, "createdAt", "updatedAt", "typeId", "brandId",(SELECT AVG(rate) FROM ratings WHERE "deviceId" = devices.id )AS "AvgRating"
        FROM devices WHERE "typeId"=${typeId} AND "brandId"=${brandId} AND name LIKE '${value}%' ORDER BY ${criteria} ${sortBy}  Limit ${limit} offset ${offset}`,
        { type: QueryTypes.SELECT }
      );
      totalDevices = await Device.count({
        where: { typeId, brandId, name: value },
      });
    }
    return res.json({ count: totalDevices, rows: devices });
  }

  async deleteOne(req, res) {
    try {
      const { id } = req.params;

      const device = await Device.findOne({ where: { id } });
      if (device) {
        await Device.destroy({ where: { id } });
        await fs.unlink(path.resolve(__dirname, "..", "static", device.img));
        return res.json({ message: "Device deleted", device });
      } else {
        return res.json({ message: "This Device doesn't exist" });
      }
    } catch (error) {
      console.log("Delete ERRor", error);
    }
  }
  async getOne(req, res) {
    const { id } = req.params;

    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }
}

module.exports = new DeviceController();
