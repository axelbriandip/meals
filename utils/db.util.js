// import sequelize
const { Sequelize } = require('sequelize');

// import dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Establish connection to db
const db = new Sequelize({
    dialect: 'postgres',
    storage: process.env.DB_STORAGE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB,
    logging: false
});

module.exports = { db };