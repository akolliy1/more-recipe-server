module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Downvotes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Recipes',
          key: 'id',
          as: 'recipeId'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface /* Sequelize */) => {
    return queryInterface.dropTable('Downvotes')
  }
}
