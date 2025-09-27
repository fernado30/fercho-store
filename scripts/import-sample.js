

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const keyPath = path.join(__dirname, '..', 'serviceAccountKey.json');
if (!fs.existsSync(keyPath)) {
  console.error('ERROR: No se encontró serviceAccountKey.json en la raíz del proyecto.');
  process.exit(1);
}

const serviceAccount = require(keyPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function importProducts() {
  const dataPath = path.join(__dirname, '..', 'sample-data', 'products.json');
  if (!fs.existsSync(dataPath)) {
    console.error('ERROR: No se encontró sample-data/products.json');
    process.exit(1);
  }
  const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  for (const p of products) {
    const docRef = await db.collection('products').add(p);
    console.log('Added product:', docRef.id, p.title);
  }
  console.log('Import complete.');
  process.exit(0);
}

importProducts().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
