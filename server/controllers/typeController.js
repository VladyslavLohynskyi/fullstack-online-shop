const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }
  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }
  async delete(req, res) {
    const { id } = req.params;
    const type = await Type.findOne({ where: { id } });
    if (type) {
      await Type.destroy({ where: { id } });
      return res.json({ message: "Type deleted", type });
    }
    return res.json({ message: "Type with this id is not exist" });
  }
  async update(req, res) {
    const { id, name } = req.body;
    let type = await Type.findOne({ where: { id } });
    if (type) {
      type = await Type.update({ name }, { where: { id } });
      return res.json({ message: "Type update", type });
    }
    return res.json({ message: "Type with this id is not exist" });
  }
}

module.exports = new TypeController();
