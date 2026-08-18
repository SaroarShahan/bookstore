const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BookModel extends Model {
    static associate(model) {
      model.BookModel.belongsTo(model.UserModel, {
        foreignKey: 'authorId',
        as: 'author',
      });
    }
  }

  BookModel.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      slug: {
        type: DataTypes.STRING(220),
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      authorId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'BookModel',
      tableName: 'books',
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  );

  return BookModel;
};
