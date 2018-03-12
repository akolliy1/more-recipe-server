'use strict';
module.exports = (sequelize, DataTypes) => {
  var RecipeItem = sequelize.define('RecipeItem', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  RecipeItem.associate = function(models) {
    // associations can be defined here
    RecipeItem.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    RecipeItem.hasMany(models.RecipeComment, {
      foreignKey: 'recipeItemId',
      as: 'recipeComments'
    });
    RecipeItem.hasMany(models.RecipeLike, {
      foreignKey: 'recipeItemId',
      as: 'recipeLikes',
    });
  };

  return RecipeItem;
};
