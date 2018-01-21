

module.exports = function (sequelize, DataTypes) {
  let Performance = sequelize.define('Performance', {
    period: DataTypes.STRING,
    value: DataTypes.FLOAT,
    itemId: DataTypes.INTEGER,
    workerId: DataTypes.INTEGER,
  });
  Performance.associate = function (models) {
    Performance.belongsToMany(models.Item, { through: 'PerformanceItem', foreignKey: 'performanceId', onDelete: 'cascade' });
    Performance.belongsToMany(models.Worker, { through: 'PerformanceWorker', foreignKey: 'performanceId', onDelete: 'cascade' });
  };
  return Performance;
};
