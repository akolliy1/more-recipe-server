'use strict';
module.exports = (sequelize, DataTypes) => {
  var Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'name must be provided for the recipe'
        }
      }
    },
    description: DataTypes.TEXT,
    procedure: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "description must be specified"
        }
      }
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "ingredients can't be empty"
        }
      }
    },
    imageUrl: DataTypes.STRING,
    imageId: DataTypes.STRING,
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true
    },
    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    }
  });
  Recipe.associate = function (models) {
    // associations can be defined here
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId'
    })
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId'
    })
    Recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeId'
    })
    Recipe.hasMany(models.Upvote, {
      foreignKey: 'recipeId'
    })
    Recipe.hasMany(models.Downvote, {
      foreignKey: 'recipeId'
    })
  };
  return Recipe;
};