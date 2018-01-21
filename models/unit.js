

module.exports = function (sequelize, DataTypes) {
  let Unit = sequelize.define('Unit', {
    name: DataTypes.STRING,
    ItemId: DataTypes.INTEGER,
  });
  Unit.associate = function (models) {
    Unit.belongsTo(models.Item, { onDelete: 'cascade' });
  };
  return Unit;
};
