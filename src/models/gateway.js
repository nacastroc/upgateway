'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gateway extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Gateway.hasMany(models['Peripheral'], {
        as: 'Peripherals',
        foreignKey: 'gateway',
      });
    }
  };
  Gateway.init({
    serial: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        isIPv4: true
      }
    }
  }, {
    sequelize,
    modelName: 'Gateway',
    tableName: 'gateways'
  });
  return Gateway;
};