'use strict';
module.exports = (sequelize, DataTypes) => {
  var RecipeLike = sequelize.define('RecipeLike', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });
  RecipeLike.associate = function(models) {
    // associations can be defined here
    RecipeLike.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    RecipeLike.belongsTo(models.RecipeItem, {
      foreignKey: 'recipeItemId',
      onDelete: 'CASCADE',
    });
    
  };
  return RecipeLike;
};