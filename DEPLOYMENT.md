# Deploy — Firebase Hosting (pasos)

1. Instalar Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login:
   ```bash
   firebase login
   ```

3. Inicializar:
   ```bash
   firebase init
   ```
   - Selecciona Hosting.
   - Elige tu proyecto Firebase.
   - Public directory: `dist`
   - Single-page app: yes
   - No sobrescribir `index.html` cuando se pregunte.

4. Construir:
   ```bash
   npm run build
   ```

5. Deploy:
   ```bash
   firebase deploy --only hosting
   ```

# Deploy — Vercel (pasos)

1. Conectar tu repositorio a Vercel.
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Variables de entorno: agrega las `VITE_FIREBASE_*` necesarias.
