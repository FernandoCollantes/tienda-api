const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config");

const ruta = path.join(__dirname, "../data/auth-usuarios.json");

function leerUsuarios() {
  const data = fs.readFileSync(ruta, "utf-8");
  return JSON.parse(data);
}

exports.login = (username, password) => {
  const usuarios = leerUsuarios();
  
  const usuario = usuarios.find(u => u.username === username);
  
  if (!usuario) {
    return { error: "Usuario no encontrado" };
  }
  
  if (usuario.password !== password) {
    return { error: "Contraseña incorrecta" };
  }
  
  // Generar JWT
  const token = jwt.sign(
    { 
      id: usuario.id, 
      username: usuario.username,
      rol: usuario.rol 
    },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );
  
  return {
    token,
    usuario: {
      id: usuario.id,
      username: usuario.username,
      nombre: usuario.nombre,
      rol: usuario.rol
    }
  };
};

exports.verificarToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    return { valido: true, datos: decoded };
  } catch (error) {
    return { valido: false, error: error.message };
  }
};