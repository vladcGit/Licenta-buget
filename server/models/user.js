const sequelize = require("./sequelize");
const { DataTypes } = require("sequelize");
const Transaction = require("./transaction");
const Goal = require("./goal");
const Investment = require("./investment");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "User" }
);

User.hasMany(Transaction, { foreignKey: "user_id", onDelete: "CASCADE" });
User.hasMany(Goal, { foreignKey: "user_id", onDelete: "CASCADE" });
User.hasMany(Investment, { foreignKey: "user_id", onDelete: "CASCADE" });

module.exports = User;
