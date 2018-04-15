'use strict';
module.exports = (sequelize, DataTypes) => {
  var Downvote = sequelize.define('Downvote', {
    recipeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Downvote.associate = function(models) {
    // associations can be defined here
  };
  return Downvote;
};