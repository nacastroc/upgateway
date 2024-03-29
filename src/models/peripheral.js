'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Peripheral extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Peripheral.belongsTo(models.Gateway, {
        as: 'Gateway',
        foreignKey: 'gateway',
        onDelete: 'CASCADE'
      })
    }

    static getSearchAttributes() {
      return ['vendor']
    }
  };
  Peripheral.init({
    vendor: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Peripheral',
    tableName: 'peripherals',
  });
  return Peripheral;
};