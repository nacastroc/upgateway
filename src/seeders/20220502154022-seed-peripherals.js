'use strict';

function vendor() {
  const vendors = ['Apple', 'Microsoft', 'Logitech', 'Lenovo', 'CISCO', 'DELL'];
  const index = Math.floor(Math.random() * vendors.length - 1);
  return vendors[index];
}

function date() {
  const start = new Date(2000, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const gateways = await queryInterface
    // Seed
    await queryInterface.bulkInsert('peripherals', [], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Revert seed
    await queryInterface.bulkDelete('peripherals', null, {});
  }
};
