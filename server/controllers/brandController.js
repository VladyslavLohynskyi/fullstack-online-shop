const { Brand } = require("../models/models");

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }
  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }
  async delete(req, res) {
    const { id } = req.params;
    const brand = await Brand.findOne({ where: { id } });
    if (brand) {
      await Brand.destroy({ where: { id } });
      return res.json({ message: "Brand deleted", brand });
    }
    return res.json({ message: "Brand with this id is not exist" });
  }
  async update(req, res) {
    const { id, name } = req.body;
    let brand = await Brand.findOne({ where: { id } });
    if (brand) {
      brand = await Brand.update({ name }, { where: { id } });
      return res.json({ message: "Brand update", brand });
    }
    return res.json({ message: "Brand with this id is not exist" });
  }
}

module.exports = new BrandController();
