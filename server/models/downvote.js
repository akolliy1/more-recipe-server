/** Define the Downvote database model/association
 * @exports Downvote
 * @param {object} sequelize - sequelize method
 * @param {object} DataTypes - sequelize Datatypes
 * @return {object} the Downvote models
 */
module.exports = (sequelize, DataTypes) => {
  const Downvote = sequelize.define('Downvote', {
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
  Downvote.associate = function (models) {
    // associations can be defined here
    Downvote.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Downvote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId'
    });
  };
  return Downvote;
};