

module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  });
  Category.associate = function (models) {
    Category.hasMany(models.Item);
    Category.belongsToMany(models.TopCategory, { through: 'CategoryTop', foreignKey: 'categoryId', onDelete: 'cascade' });
  };
  return Category;
};
