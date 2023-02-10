const sequelize = require("./sequelize");
const { DataTypes } = require("sequelize");
const Category = require("./category");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Inflow", "Outflow"),
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recurrent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  { tableName: "Transaction" }
);

Category.hasMany(Transaction, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

module.exports = Transaction;
