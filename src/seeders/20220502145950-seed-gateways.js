'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed
    await queryInterface.bulkInsert('gateways', [{
      serial: uuidv4(),
      name: 'Master 1',
      address: '192.168.1.1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      serial: uuidv4(),
      name: 'Master 2',
      address: '192.168.1.2',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      serial: uuidv4(),
      name: 'Master 3',
      address: '192.168.1.3',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      serial: uuidv4(),
      name: 'Master 4',
      address: '192.168.1.4',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Revert seed
    await queryInterface.bulkDelete('gateways', null, {});
  }
};
