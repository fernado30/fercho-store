const admin = require("firebase-admin");
const fs = require("fs");

// Verifica si existe el archivo de credenciales
if (!fs.existsSync("./serviceAccountKey.json")) {
  console.error(" ERROR: No se encontró el archivo serviceAccountKey.json en la raíz del proyecto");
  process.exit(1);
}

// Inicializar Firebase con credenciales de servicio
admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json"))
});

const db = admin.firestore();

// Data de pedidos de ejemplo
const pedidos = [
  {
    id: "o1",
    usuario: "fernando@example.com",
    items: [
      { productoId: "p1", nombre: "Laptop Gamer", cantidad: 1, precio: 3500 },
      { productoId: "p2", nombre: "Camiseta Deportiva", cantidad: 2, precio: 50 },
    ],
    total: 3600,
    estado: "pendiente",
    fecha: new Date().toISOString()
  },
  {
    id: "o2",
    usuario: "maria@example.com",
    items: [
      { productoId: "p3", nombre: "Silla ergonómica", cantidad: 1, precio: 700 },
    ],
    total: 700,
    estado: "preparando",
    fecha: new Date().toISOString()
  },
  {
    id: "o3",
    usuario: "julio@example.com",
    items: [
      { productoId: "p2", nombre: "Camiseta Deportiva", cantidad: 3, precio: 50 },
    ],
    total: 150,
    estado: "enviado",
    fecha: new Date().toISOString()
  }
];

// Función para importar pedidos
const importarPedidos = async () => {
  try {
    console.log(" Importando pedidos...");
    for (const pedido of pedidos) {
      await db.collection("pedidos").doc(pedido.id).set(pedido);
    }
    console.log(" Pedidos importados correctamente");
    process.exit();
  } catch (error) {
    console.error(" Error al importar pedidos:", error);
    process.exit(1);
  }
};

importarPedidos();