'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkInsert('Users', [{
        name: 'John Doe',
        email: 'adex@example.com',
        username: 'iamuser',
        password: 'ampassword'
        // isBetaMember: false
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete('Users', null, {});
    
  }
};
