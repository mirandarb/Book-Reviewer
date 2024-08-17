// Purpose: Establishes a connection to the PostgreSQL database using Sequelize
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
    sequelize = new Sequelize(process.env.DB_URL)
}