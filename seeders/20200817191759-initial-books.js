'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 
    */
  await queryInterface.bulkInsert('People', [
    {"id":2,"title":"Harry Potter and the Philosopher's Stone","author":"J.K. Rowling","genre":"Fantasy","year":"1997","createdAt":"2020-08-18T00:41:01.737+08:00","updatedAt":"2020-08-18T00:41:01.737+08:00"}

  ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Books', null, {});
  }
};
