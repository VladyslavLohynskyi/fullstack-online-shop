const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

require("dotenv").config();
const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    console.log(process.env.SECRET_KEY);
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Uncorect email or password"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("User with this email has already exist")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("User with this email is not exist"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("Incorrect Password"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    console.log(token);
    return res.json({ token });
  }
  async getByCriteria(req, res) {
    try {
      const { criteria } = req.params;
      const filteredUsers = await User.findAndCountAll({
        where: { role: criteria },
      });
      return res.json(filteredUsers);
    } catch (error) {
      res.json({ message: "get Users error " + error.message });
    }
  }
  async getUser(req, res) {
    try {
      const { email } = req.query;
      const user = await User.findOne({
        where: { email, role: "USER" },
      });
      return res.json(user);
    } catch (error) {
      res.json({ message: "get User by email " + error.message });
    }
  }
  async changeRole(req, res) {
    try {
      const { email, role } = req.body;
      await User.update(
        { role },
        {
          where: { email },
        }
      );
      return res.json({ message: "User " + email + " change role to " + role });
    } catch (error) {
      return res.json({ message: "Cant change role" });
    }
  }
}

module.exports = new UserController();
