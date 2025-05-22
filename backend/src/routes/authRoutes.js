const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
  loginUser,
  registerUser,
  getCurrentUser
} = require('../controllers/authController');

console.log({
  loginUser,
  registerUser,
  getCurrentUser
}); 

router.get('/test', (req, res) => {
  res.json({ 
    message: 'Conexão com o backend estabelecida com sucesso!',
    timestamp: new Date().toISOString()
  });
});


// Rotas
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', protect, getCurrentUser);

module.exports = router;