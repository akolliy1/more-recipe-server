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
  }, {});
  RecipeItem.associate = function(models) {
    // associations can be defined here
    RecipeItem.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return RecipeItem;
};