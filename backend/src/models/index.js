const sequelize = require('../config/db'); // ← Mudei para db.js
const User = require('./User');
const Task = require('./Task');

// Definir associações
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

// Sincronizar o banco de dados
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco estabelecida com sucesso.');
    
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados com o banco.');
  } catch (error) {
    console.error('Erro ao sincronizar banco:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Task,
  syncDatabase
};