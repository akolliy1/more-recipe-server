'use strict';
module.exports = (sequelize, DataTypes) => {
  var Upvote = sequelize.define('Upvote', {
    recipeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Upvote.associate = function(models) {
    // associations can be defined here
  };
  return Upvote;
};