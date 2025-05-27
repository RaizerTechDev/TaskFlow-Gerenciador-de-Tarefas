const { Sequelize } = require('sequelize');

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ...(isProduction && {
        ssl: {
          require: true,
          rejectUnauthorized: false 
        }
      })
    },
    logging: console.log, 
  }
);

module.exports = sequelize;