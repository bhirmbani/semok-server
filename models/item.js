

module.exports = function (sequelize, DataTypes) {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
    createdBy: DataTypes.STRING,
    freq: {
      type: DataTypes.ENUM(1, 3, 12)
    },
    year: DataTypes.INTEGER
  });
  Item.associate = function (models) {
    Item.belongsToMany(models.Worker, { through: 'WorkerItem', foreignKey: 'itemId', onDelete: 'cascade' });
    Item.belongsToMany(models.Performance, { through: 'PerformanceItem', foreignKey: 'itemId', onDelete: 'cascade' });
    Item.belongsToMany(models.Progress, { through: 'ProgressItem', foreignKey: 'itemId', onDelete: 'cascade' });
    Item.belongsToMany(models.Target, { through: 'TargetItem', foreignKey: 'itemId', onDelete: 'cascade' });
    Item.belongsToMany(models.Status, { through: 'StatusItem', foreignKey: 'itemId', onDelete: 'cascade' });
    Item.belongsTo(models.Category, { onDelete: 'cascade' });
    Item.hasMany(models.Bobot, { onDelete: 'cascade' });
    Item.hasMany(models.Info, { onDelete: 'cascade' });
    Item.hasMany(models.Unit, { onDelete: 'cascade' });
  };
  return Item;
};
