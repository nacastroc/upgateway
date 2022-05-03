'use strict';

const db = require('../models')

/**
 * Get a random vendor.
 * @returns {string} - vendor's name.
 */
function vendor() {
  const vendors = ['Apple', 'Microsoft', 'Logitech', 'Lenovo', 'CISCO', 'DELL'];
  const index = Math.floor(Math.random() * vendors.length);
  return vendors[index];
}

/**
 * Get a random date starting from January 1'st, 2000.
 * @returns {Date}
 */
function date() {
  const start = new Date(2000, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get existing gateways as they are required to create peripherals.
    let peripherals = []
    const gateways = await db['Gateway'].findAll();
    for (let gateway of gateways) {
      const limit = Math.floor(Math.random() * 10) + 1;
      for (let i = 1; i <= limit; i++) {
        peripherals.push({
          gateway: gateway.serial,
          vendor: vendor(),
          date: date(),
          status: Math.random() < 0.5, // 50% chance for true or false value.
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
    }
    // Seed.
    await queryInterface.bulkInsert('peripherals', peripherals, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Revert seed.
    await queryInterface.bulkDelete('peripherals', null, {});
  }
};
