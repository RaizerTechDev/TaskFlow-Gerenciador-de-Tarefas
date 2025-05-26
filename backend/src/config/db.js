const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Necessário para conexão com Render PostgreSQL
      }
    },
    logging: false,
    protocol: 'postgres',
    ssl: true // Habilita SSL
  }
);

// Teste de conexão (opcional)
sequelize.authenticate()
  .then(() => console.log('Conexão com o banco estabelecida!'))
  .catch(err => console.error('Erro de conexão:', err));

module.exports = sequelize;
