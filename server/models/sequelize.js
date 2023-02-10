const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://pjbezxfc:E5KxEtQBK1ijb8ygK2WQeFQWGhfggLiA@kandula.db.elephantsql.com/pjbezxfc",
  {
    dialect: "postgres",
    define: {
      timestamps: false,
    },
  }
);

module.exports = sequelize;
