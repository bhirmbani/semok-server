

module.exports = function (sequelize, DataTypes) {
  const Todo = sequelize.define('Todo', {
    task: DataTypes.STRING,
    isCompleted: DataTypes.BOOLEAN,
  });
  return Todo;
};
