

module.exports = function (sequelize, DataTypes) {
  let CategoryTop = sequelize.define('CategoryTop', {
    categoryId: DataTypes.INTEGER,
    topCategoryId: DataTypes.INTEGER,
  });
  CategoryTop.associate = function (models) {
    CategoryTop.belongsTo(models.Category, { foreignKey: 'categoryId', onDelete: 'cascade' });
    CategoryTop.belongsTo(models.TopCategory, { foreignKey: 'topCategoryId', onDelete: 'cascade' });
  };
  return CategoryTop;
};
