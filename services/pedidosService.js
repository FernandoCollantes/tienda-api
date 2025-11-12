const fs = require("fs");
const path = require("path");
const ruta = path.join(__dirname, "../data/pedidos.json");
const rutaProductos = path.join(__dirname, "../data/productos.json");

function leer() {
  const data = fs.readFileSync(ruta, "utf-8");
  return JSON.parse(data);
}

function leerJSON(rutaArchivo) {
  return JSON.parse(fs.readFileSync(rutaArchivo, "utf-8"));
}

function guardar(datos) {
  fs.writeFileSync(ruta, JSON.stringify(datos, null, 2));
}



exports.listar = () => leer();
//exports.buscarPorId = (id) => leer().find((p) => p.id === id);
/*exports.buscarPorId = (id) => {

  const pedidos = leer();
  const productos = leerJSON(rutaProductos);
  
  // Convertimos id recibido en número
  id = Number(id);

  const pedido = pedidos.find(p => p.id === id);
  if (!pedido) return null;

  const productosCompletos = pedido.productos.map(prodId => {
    const producto = productos.find(p => p.id === prodId);
    return producto && {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio
    };
  }).filter(Boolean);

  return {
    id: pedido.id,
    clienteId: pedido.clienteId,
    total: pedido.total,
    productos: productosCompletos
  };
};*/
//Esto es de la ia(REVISAR)
exports.buscarPorId = (id) => {
  const pedidos = leer();
  const productos = leerJSON(rutaProductos);

  // normalizamos id recibido a número y comprobamos
  const pedidoId = Number(id);
  if (Number.isNaN(pedidoId)) return null;

  // buscamos el pedido asegurándonos de comparar números
  const pedido = pedidos.find(p => Number(p.id) === pedidoId);
  if (!pedido) return null;

  // soportamos dos formatos en pedido.productos:
  //   [1,2,3]  -> array de ids
  //   [{id:1,cantidad:2}, {id:2}] -> array de objetos
  const productosCompletos = (Array.isArray(pedido.productos) ? pedido.productos : [])
    .map(item => {
      // extraemos el id del elemento (si item es objeto usamos item.id)
      const prodId = Number(typeof item === 'object' && item !== null ? item.id : item);
      if (Number.isNaN(prodId)) return null;

      const producto = productos.find(p => Number(p.id) === prodId);
      if (!producto) return null;

      // opcional: si el pedido incluye cantidad, la añadimos y calculamos subtotal
      const cantidad = (typeof item === 'object' && item !== null && item.cantidad)
        ? Number(item.cantidad)
        : 1;

      const subtotal = Number((producto.precio * cantidad).toFixed(2));

      return {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad,
        subtotal
      };
    })
    .filter(p => p !== null);

  // si prefieres usar el total guardado en el pedido usa pedido.total,
  // aquí calculo el total a partir de los subtotales por seguridad/consistencia
  const totalCalculado = Number(productosCompletos.reduce((s, p) => s + p.subtotal, 0).toFixed(2));

  return {
    id: pedido.id,
    clienteId: pedido.clienteId,
    total: pedido.total !== undefined ? pedido.total : totalCalculado,
    productos: productosCompletos
  };
};

exports.crear = (nuevo) => {
  const datos = leer();
  nuevo.id = datos.length ? Math.max(...datos.map((p) => p.id)) + 1 : 1;
  datos.push(nuevo);
  guardar(datos);
  return nuevo;
};
exports.actualizar = (id, cambios) => {
  const datos = leer();
  const index = datos.findIndex((p) => p.id === id);
  if (index === -1) return null;
  datos[index] = { ...datos[index], ...cambios };
  guardar(datos);
  return datos[index];
};
exports.eliminar = (id) => {
  const datos = leer();
  const index = datos.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const eliminado = datos.splice(index, 1);
  guardar(datos);
  return eliminado[0];
};
