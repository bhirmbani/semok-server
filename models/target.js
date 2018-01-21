

module.exports = function (sequelize, DataTypes) {
  let Target = sequelize.define('Target', {
    period: DataTypes.ENUM(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
    base: DataTypes.DECIMAL,
    stretch: DataTypes.DECIMAL,
  });
  Target.associate = function (models) {
    Target.belongsToMany(models.Item, { through: 'TargetItem', foreignKey: 'targetId', onDelete: 'cascade' });
  };
  return Target;
};
