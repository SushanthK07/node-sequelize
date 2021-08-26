const { Sequelize } = require("sequelize");

const up = async (queryInterface) =>
  queryInterface.createTable("boards", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    board_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "cascade",
    },
    board: {
      type: Sequelize.JSON,
    },
    board_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

const down = async (queryInterface) => queryInterface.dropTable("boards");

module.exports.up = up;
module.exports.down = down;
