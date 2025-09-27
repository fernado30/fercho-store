

## Importar datos de prueba (script)

He incluido un script de Node.js para importar `sample-data/products.json` a Firestore usando `firebase-admin`.

Pasos:
1. Crea una cuenta de servicio en Firebase Console (IAM & Admin -> Service Accounts -> Generate new private key) y descarga `serviceAccountKey.json`.
2. Coloca `serviceAccountKey.json` en la raíz del proyecto (junto a package.json).
3. Instala dependencias para el script:
   ```bash
   npm install firebase-admin
   ```
4. Ejecuta:
   ```bash
   node scripts/import-sample.js
   ```

Esto subirá los productos a la colección `products`.

---

## Implementaciones incluidas (confirmación)

1. **Código completo del proyecto**  — `src/` con componentes, páginas, servicios y estado global.  
2. **Integración de `onAuthStateChanged`** para sincronizar el usuario con Zustand (`src/main.jsx`).  
3. **Datos de prueba** en `sample-data/products.json`.  
4. **Reglas de Firestore de ejemplo** en `firestore.rules`.



