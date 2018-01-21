'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Statuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      period: {
        type: Sequelize.ENUM(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
      },
      value: {
        type: Sequelize.FLOAT
      },
      stats: {
        type: Sequelize.ENUM('red', 'green', 'star'),
        dafaultValue: 'red',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Statuses');
  }
};