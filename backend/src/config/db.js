const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'taskmanager',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'postgres',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Testar conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com PostgreSQL estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Erro ao conectar com PostgreSQL:', err);
  });

module.exports = sequelize; // ← Certifique-se que está exportando