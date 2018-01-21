

module.exports = function (sequelize, DataTypes) {
  const WorkerItem = sequelize.define('WorkerItem', {
    itemId: DataTypes.INTEGER,
    workerId: DataTypes.INTEGER,
  });
  WorkerItem.associate = function (models) {
    WorkerItem.belongsTo(models.Item, { foreignKey: 'itemId', onDelete: 'cascade' });
    WorkerItem.belongsTo(models.Worker, { foreignKey: 'workerId', onDelete: 'cascade' });
  };
  return WorkerItem;
};
