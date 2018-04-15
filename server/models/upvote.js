/** Define the Upvote database model/association
 * @exports Upvote
 * @param  {object} sequelize - sequelize
 * @param  {object} DataTypes - sequelize Datatypes
 * @return {object} The Upvote model
 */
module.exports = (sequelize, DataTypes) => {
  var Upvote = sequelize.define('Upvote', {
    recipeId: {
      type: DataTypes.INTEGER,
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
        as: 'userId'
      }
    },
  });
  Upvote.associate = function(models) {
    // associations can be defined here
    Upvote.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Upvote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId'
    });
  };
  return Upvote;
};