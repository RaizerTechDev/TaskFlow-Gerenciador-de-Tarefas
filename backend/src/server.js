const app = require('./app');
const sequelize = require('./config/db');
const PORT = process.env.PORT || 5000;

const MAX_RETRIES = 5;
let retryCount = 0;

const connectWithRetry = async () => {
  try {
    await sequelize.authenticate({ logging: false });
    console.log('✅ Database connected via SSL');
    
    await sequelize.sync({ alter: true });
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (err) {
    if(retryCount < MAX_RETRIES) {
      retryCount++;
      console.error(`❌ Connection failed (attempt ${retryCount}/${MAX_RETRIES}):`, err.message);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.error('💥 Maximum connection attempts reached. Exiting...');
      process.exit(1);
    }
  }
};

// Inicia a conexão
connectWithRetry();

// Eventos de encerramento
process.on('SIGINT', async () => {
  console.log('\n🔻 Shutting down gracefully...');
  await sequelize.close();
  process.exit(0);
});