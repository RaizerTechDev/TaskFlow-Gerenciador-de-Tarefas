const jwt = require('jsonwebtoken');
const { User } = require('../models');

const protect = async (req, res, next) => {
   const token = req.headers.authorization?.split(' ')[1] || 
                req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = { protect };