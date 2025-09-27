const admin = require("firebase-admin");
const fs = require("fs");

// Verifica si existe el archivo de credenciales
if (!fs.existsSync("./serviceAccountKey.json")) {
  console.error("❌ ERROR: No se encontró el archivo serviceAccountKey.json en la raíz del proyecto");
  process.exit(1);
}

// Inicializar Firebase con credenciales de servicio
admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json"))
});

const db = admin.firestore();

// Data inicial
const categorias = [
  { id: "1", nombre: "Tecnología" },
  { id: "2", nombre: "Ropa" },
  { id: "3", nombre: "Hogar" },
];

const productos = [
  {
    id: "p1",
    nombre: "Laptop Gamer",
    descripcion: "Laptop con procesador i7 y 16GB RAM",
    precio: 3500,
    categoria: "Tecnología",
    imagen: "https://via.placeholder.com/150"
  },
  {
    id: "p2",
    nombre: "Camiseta Deportiva",
    descripcion: "Camiseta transpirable para entrenamiento",
    precio: 50,
    categoria: "Ropa",
    imagen: "https://via.placeholder.com/150"
  },
  {
    id: "p3",
    nombre: "Silla ergonómica",
    descripcion: "Silla de oficina con soporte lumbar",
    precio: 700,
    categoria: "Hogar",
    imagen: "https://via.placeholder.com/150"
  }
];

// Función para importar datos
const importarData = async () => {
  try {
    console.log(" Importando categorías...");
    for (const cat of categorias) {
      await db.collection("categorias").doc(cat.id).set(cat);
    }
    console.log(" Categorías importadas");

    console.log(" Importando productos...");
    for (const prod of productos) {
      await db.collection("productos").doc(prod.id).set(prod);
    }
    console.log(" Productos importados");

    console.log(" Importación completada con éxito");
    process.exit();
  } catch (error) {
    console.error(" Error al importar datos:", error);
    process.exit(1);
  }
};

importarData();