const authService = require("../services/authService");

exports.login = (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ 
      mensaje: 'Faltan campos: username y password' 
    });
  }
  
  const resultado = authService.login(username, password);
  
  if (resultado.error) {
    return res.status(401).json({ 
      mensaje: resultado.error 
    });
  }
  
  res.json({
    mensaje: 'Login exitoso',
    token: resultado.token,
    usuario: resultado.usuario
  });
};

exports.verificar = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      mensaje: 'Token no proporcionado' 
    });
  }
  
  const resultado = authService.verificarToken(token);
  
  if (!resultado.valido) {
    return res.status(401).json({ 
      mensaje: 'Token inválido o expirado' 
    });
  }
  
  res.json({
    mensaje: 'Token válido',
    datos: resultado.datos
  });
};