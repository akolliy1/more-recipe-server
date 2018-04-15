'use strict';
module.exports = (sequelize, DataTypes) => {
  var Favorite = sequelize.define('Favorite', {
    recipeId: {
      types: DataTypes.INTEGER,
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'recipeId'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    },
  });
  Favorite.associate = function(models) {
    // associations can be defined here
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
    Favorite.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    })
  };
  return Favorite;
};