const { Sequelize } = require("sequelize");

const up = async (queryInterface) =>
  queryInterface.createTable("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
    },
    email_id: {
        type: Sequelize.STRING,
    },
    boards: {
      type: Sequelize.JSON,
    },
  });

const down = async (queryInterface) =>
  queryInterface.dropTable("users");

module.exports.up = up;
module.exports.down = down;
