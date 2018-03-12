'use strict';
module.exports = (sequelize, DataTypes) => {
  var RecipeComment = sequelize.define('RecipeComment', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  RecipeComment.associate = function(models) {
    // associations can be defined here
    RecipeComment.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    RecipeComment.belongsTo(models.RecipeItem, {
      foreignKey: 'recipeItemId',
      onDelete: 'CASCADE',
    });
  };
  return RecipeComment;
};
