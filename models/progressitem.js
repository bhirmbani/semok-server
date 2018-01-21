

module.exports = function (sequelize, DataTypes) {
  let ProgressItem = sequelize.define('ProgressItem', {
    progressId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
  });
  ProgressItem.associate = function (models) {
    ProgressItem.belongsTo(models.Progress, { foreignKey: 'progressId', onDelete: 'cascade' });
    ProgressItem.belongsTo(models.Item, { foreignKey: 'itemId', onDelete: 'cascade' });
  };
  return ProgressItem;
};
