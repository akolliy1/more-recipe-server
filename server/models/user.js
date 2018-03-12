'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }/*, {}*/);
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.RecipeItem, {
      foreignKey: 'userId',
      as: 'recipeItems',
    });
    User.hasMany(models.RecipeComment, {
      foreignKey: 'userId',
      as: 'recipeComments',
    });
    User.hasOne(models.RecipeLike, {
      foreignKey: 'userId',
      as: 'recipeLikes'
    })
  };

  return User;
};
