const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db'); // Assuming your Sequelize instance is exported from '../db/db'

class Form extends Model { }

Form.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    data: {
        type: DataTypes.JSON
    },
    update_status: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    email: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    client_data: {
        type: DataTypes.JSON,
        defaultValue: null
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'form', // Specify the model name
    tableName: 'form', // Specify the table name // We need to choose the model name
    timestamps: false
});

module.exports = Form;
