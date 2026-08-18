'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      slug: {
        type: Sequelize.STRING(220),
        allowNull: false,
        unique: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      author_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('books');
  },
};
