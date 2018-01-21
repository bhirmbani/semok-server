

module.exports = function (sequelize, DataTypes) {
  let Status = sequelize.define('Status', {
    period: DataTypes.ENUM(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
    value: DataTypes.FLOAT,
    stats: {
      type: DataTypes.ENUM('red', 'green', 'star'),
      defaultValue: 'red',
    },
  });
  Status.associate = function (models) {
    Status.belongsToMany(models.Item, { through: 'StatusItem', foreignKey: 'statusId', onDelete: 'cascade' });
  };
  return Status;
};
