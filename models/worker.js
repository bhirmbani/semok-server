

module.exports = function (sequelize, DataTypes) {
  const Worker = sequelize.define('Worker', {
    name: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('staff', 'admin', 'manager', 'asmen'),
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  Worker.associate = function (models) {
    Worker.belongsToMany(models.Item, { through: 'WorkerItem', foreignKey: 'workerId', onDelete: 'cascade' });
    Worker.belongsToMany(models.TopCategory, { through: 'BobotSum', foreignKey: 'workerId', onDelete: 'cascade' });
    Worker.belongsToMany(models.Performance, { through: 'PerformanceWorker', foreignKey: 'workerId', onDelete: 'cascade' });
    Worker.hasMany(models.Bobot, { onDelete: 'cascade' });
    Worker.hasMany(models.Info, { onDelete: 'cascade' });
  };
  return Worker;
};
