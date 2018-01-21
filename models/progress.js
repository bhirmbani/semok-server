

module.exports = function (sequelize, DataTypes) {
  let Progress = sequelize.define('Progress', {
    period: DataTypes.ENUM(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
    value: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
  });
  Progress.associate = function (models) {
    Progress.belongsToMany(models.Item, { through: 'ProgressItem', foreignKey: 'progressId', onDelete: 'cascade' });
  };
  return Progress;
};
