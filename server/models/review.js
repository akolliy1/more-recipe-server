/** Define the Review database model/association
 * @exports Review
 * @param  {object} sequelize - sequelize
 * @param  {object} DataTypes - sequelize Datatypes
 * @return {object} The Review model
 */
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('Review', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'review can\'t be empty'
        }
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        models: 'Recipes',
        key: 'id',
        as: 'recipeId'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        models: 'Users',
        key: 'id',
        as: 'userId',
      }
    },
  });
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, {
      foreignKey: 'userId'
    })
    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId'
    })
  };
  return Review;
};