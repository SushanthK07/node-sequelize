const { QueryTypes, Sequelize } = require("sequelize");

const up = async (queryInterface) => {
  const rows = await queryInterface.sequelize.query(
    `SELECT id, boards FROM users`,
    { type: QueryTypes.SELECT }
  );

  const insertData = rows.reduce((newRows, { id, boards }) => {
    const results = boards.map((board) => ({
      user_id: id,
      board_name: board.name,
      board: JSON.stringify(board),
    }));
    return [...newRows, ...results];
  }, []);

  if (!insertData.length) return;
  await queryInterface.bulkInsert("boards", insertData);

  return queryInterface.removeColumn("users", "boards");
};

const down = async (queryInterface) => {
  await queryInterface.addColumn("users", "boards", Sequelize.JSON);

  const user_ids = await queryInterface.sequelize.query(
    `SELECT id FROM users`,
    {
      type: QueryTypes.SELECT,
    }
  );

  const results = user_ids.map(async ({ id }) => {
    const rows = await queryInterface.sequelize.query(
      `SELECT board FROM boards WHERE user_id=${id}`,
      {
        type: QueryTypes.SELECT,
      }
    );

    const boards = JSON.stringify(
      rows.reduce((acc, { board }) => [...acc, board], [])
    );

    return queryInterface.sequelize.query(
      `UPDATE users SET boards='${boards}' WHERE id=${id}`,
      {
        type: QueryTypes.UPDATE,
      }
    );
  });
  await Promise.all(results);

  return queryInterface.sequelize.query(
    `DELETE FROM boards`,
    {
      type: QueryTypes.DELETE,
    }
  );
};

module.exports.up = up;
module.exports.down = down;
