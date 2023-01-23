const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

const secret = process.env.SECRET || "secret";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(401).json({ error: "Not authenticated user" });
    const userObject = jwt.verify(token, secret);
    req.user = await User.findOne({
      where: { id: userObject.id, email: userObject.email },
      attributes: { exclude: ["parola"] },
      raw: true,
    });
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ error: "Token is wrong or expired" });
  }
};

module.exports = auth;
