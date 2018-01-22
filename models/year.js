module.exports = function (sequelize, DataTypes) {
  const Year = sequelize.define('Year', {
    name: DataTypes.STRING,
  });
  return Year;
};
