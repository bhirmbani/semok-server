

module.exports = function (sequelize, DataTypes) {
  let Info = sequelize.define('Info', {
    delegateBy: DataTypes.STRING,
    delegateTo: DataTypes.STRING,
    ItemId: DataTypes.INTEGER,
    WorkerId: DataTypes.INTEGER,
  });
  Info.associate = function (models) {
    Info.belongsTo(models.Item, { onDelete: 'cascade' });
    Info.belongsTo(models.Worker, { onDelete: 'cascade' });
  };
  return Info;
};
