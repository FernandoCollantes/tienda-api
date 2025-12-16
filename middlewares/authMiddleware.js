const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

// Middleware para verificar token JWT
const verificarToken = (req, res, next) => {
  // Obtener token del header Authorization
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ 
      mensaje: 'Acceso denegado: No se proporcionó token' 
    });
  }
  
  // El formato debe ser: "Bearer TOKEN"
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      mensaje: 'Acceso denegado: Formato de token inválido' 
    });
  }
  
  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, jwtConfig.secret);
    
    // Agregar los datos del usuario al request
    req.usuario = decoded;
    
    // Continuar con la siguiente función
    next();
  } catch (error) {
    return res.status(401).json({ 
      mensaje: 'Token inválido o expirado' 
    });
  }
};

module.exports = verificarToken;