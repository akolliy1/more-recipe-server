'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('User', [
      {
      name: 'John Doe',
      email: 'adex@example.com',
      username: 'iamuser',
      password: 'ampassword',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      },
      {
        name: 'akolade',
        username: 'akolliy',
        email: 'akolliy@example.com',
        password: 'akolliy1234',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
  ], {});
  },

  down: (queryInterface/*, Sequelize*/) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
