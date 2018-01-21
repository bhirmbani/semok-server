

module.exports = function (sequelize, DataTypes) {
  let Bobot = sequelize.define('Bobot', {
    value: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ItemId: DataTypes.INTEGER,
    WorkerId: DataTypes.INTEGER,
  });
  Bobot.associate = function (models) {
    Bobot.belongsTo(models.Item, { onDelete: 'cascade' });
    Bobot.belongsTo(models.Worker, { onDelete: 'cascade' });
  };
  return Bobot;
};
