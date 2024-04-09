'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     await queryInterface.bulkInsert('People', [{
       name: 'John Doe',
        isBetaMember: false
      }], {});
    */

      await queryInterface.bulkInsert('Product', [{
        name: 'John Doe',
         quantity: 10,
         imageUrl: "www",
         price: 6.99,
         measure: "kg"
       }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
