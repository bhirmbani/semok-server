

module.exports = function (sequelize, DataTypes) {
  let PerformanceWorker = sequelize.define('PerformanceWorker', {
    performanceId: DataTypes.INTEGER,
    workerId: DataTypes.INTEGER,
  });
  PerformanceWorker.associate = function (models) {
    PerformanceWorker.belongsTo(models.Performance, { foreignKey: 'performanceId', onDelete: 'cascase' });
    PerformanceWorker.belongsTo(models.Worker, { foreignKey: 'workerId', onDelete: 'cascase' });
  };
  return PerformanceWorker;
};
