

module.exports = function (sequelize, DataTypes) {
  let PerformanceItem = sequelize.define('PerformanceItem', {
    performanceId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
  });
  PerformanceItem.associate = function (models) {
    PerformanceItem.belongsTo(models.Item, { foreignKey: 'itemId', onDelete: 'cascade' });
    PerformanceItem.belongsTo(models.Performance, { foreignKey: 'performanceId', onDelete: 'cascade' });
  };
  return PerformanceItem;
};
