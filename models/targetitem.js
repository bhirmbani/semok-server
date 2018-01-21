

module.exports = function (sequelize, DataTypes) {
  let TargetItem = sequelize.define('TargetItem', {
    targetId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
  });
  TargetItem.associate = function (models) {
    TargetItem.belongsTo(models.Target, { foreignKey: 'targetId', onDelete: 'cascade' });
    TargetItem.belongsTo(models.Item, { foreignKey: 'itemId', onDelete: 'cascade' });
  };
  return TargetItem;
};
