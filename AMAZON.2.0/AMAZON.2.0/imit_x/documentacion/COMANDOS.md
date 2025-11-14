# 🚀 Comandos de Ejecución - Amazon 2.0

Aquí están todos los comandos que estamos usando para ejecutar el backend y frontend del proyecto.

---

## 📋 Terminal 1 - Backend (Express.js + Node.js)

### Ubicación
```bash
cd C:\Users\ianca\Downloads\Amazon2.01\Amazon2.01\Amazon2.0\imit_x\server
```

### Comando para iniciar (con nodemon - recomendado para desarrollo)
```bash
npm run dev
```

**Esperado:**
```
Server listening on port 4000
MySQL connection successful
```

---

## 📋 Terminal 2 - Frontend (Vite + React + Ionic)

### Ubicación
```bash
cd C:\Users\ianca\Downloads\Amazon2.01\Amazon2.01\Amazon2.0\imit_x
```

### Comando para iniciar (con Vite dev server)
```bash
npm run dev
```

**Esperado:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

---

## 🔄 Flujo Completo de Ejecución

### Paso 1: Abrir dos terminales

**Terminal 1 - Backend:**
```
C:\Users\ianca\Downloads\Amazon2.01\Amazon2.01\Amazon2.0\imit_x\server>
```

**Terminal 2 - Frontend:**
```
C:\Users\ianca\Downloads\Amazon2.01\Amazon2.01\Amazon2.0\imit_x>
```

---

### Paso 2: Instalar dependencias (primera vez)

**En Terminal 1 (Backend):**
```bash
npm install
```

**En Terminal 2 (Frontend):**
```bash
npm install
```

---

### Paso 3: Iniciar servicios

**En Terminal 1 (Backend):**
```bash
npm run dev
```
✅ Espera a que diga: `Server listening on port 4000`

**En Terminal 2 (Frontend):**
```bash
npm run dev
```
✅ Espera a que diga: `http://localhost:5173/`

---

### Paso 4: Abrir en navegador

```
http://localhost:5173
```

---

## 🛠️ Otros Comandos Útiles

### Frontend (Terminal 2)

**Build para producción:**
```bash
npm run build
```

**Preview del build:**
```bash
npm run preview
```

**Verificar errores de TypeScript:**
```bash
npm run check
```

---

### Backend (Terminal 1)

**Iniciar sin nodemon (sin auto-reload):**
```bash
npm start
```

**Aplicar esquema SQL a la BD:**
```bash
node run_schema.js
```

**Instalar dependencias nuevamente:**
```bash
npm install
```

---

## 🗄️ Base de Datos

### Conectar a MySQL

```bash
mysql -u root -p amazon
# Cuando pida contraseña: IanZaid0607%
```

### Ver tablas
```sql
SHOW TABLES;
```

### Ver contenido del carrito
```sql
SELECT * FROM carts;
```

### Limpiar datos
```sql
DELETE FROM carts;
DELETE FROM addresses;
```

### Salir de MySQL
```sql
exit
```

---

## 🔌 Puertos Utilizados

| Servicio | Puerto | URL |
|----------|--------|-----|
| Frontend (Vite) | 5173 | http://localhost:5173 |
| Backend (Express) | 4000 | http://localhost:4000 |
| MySQL | 3306 | localhost:3306 |

---

## ⚠️ Solución de Problemas Rápida

### Error: "Port 4000 already in use"

**Windows (PowerShell):**
```bash
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

Luego vuelve a ejecutar: `npm run dev` en Terminal 1

---

### Error: "Cannot connect to MySQL"

1. Verificar credenciales en `server/.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=IanZaid0607%
DB_NAME=amazon
PORT=4000
```

2. Asegurarse de que MySQL está corriendo:
   - Windows: Services → MySQL80 (debe estar corriendo)
   - O ejecutar: `mysqld`

3. Reintentar: `npm run dev` en Terminal 1

---

### Error: "Module not found"

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

### Error: "Port 5173 already in use"

```bash
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

Luego vuelve a ejecutar: `npm run dev` en Terminal 2

---

## 📱 Cuentas de Prueba

**Cliente:**
```
Email: cliente@example.com
Password: 123456
```

**Vendedor:**
```
Email: vendedor@example.com
Password: 123456
```

O crea nuevas cuentas en `/register`

---

## 🧪 Pruebas Rápidas

### Probar que el backend funciona

```bash
curl http://localhost:4000/api/products
```

Si devuelve un JSON con productos, ✅ está funcionando.

### Probar que el frontend carga

```
http://localhost:5173
```

Debe cargar la página de inicio de Amazon 2.0.

---

## 💾 Fallback a JSON

Si MySQL no está disponible:
- Los datos se guardan en: `server/cart.json`
- Las direcciones en: `server/addresses.json`
- Los productos del vendedor en: `server/products.json`

La aplicación seguirá funcionando sin la BD. ✅

---

## 📊 Estructura de Carpetas para Ejecutar

```
Amazon2.0/
├── imit_x/                    ← Carpeta raíz del proyecto
│   ├── server/                ← Terminal 1 (npm run dev)
│   │   ├── index.js
│   │   ├── db.js
│   │   ├── .env
│   │   ├── package.json
│   │   └── ...
│   │
│   ├── src/                   ← Código frontend
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
│
└── documentacion/             ← Documentación completa
    ├── README.md
    ├── QUICK_START.md
    ├── INTERFACES.md
    ├── CHANGELOG.md
    ├── INDEX.md
    └── COMANDOS.md            ← Este archivo
```

---

## 🔗 Variables de Entorno (.env)

**Archivo: `server/.env`**

```env
# Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=IanZaid0607%
DB_NAME=amazon

# Servidor
PORT=4000
NODE_ENV=development
```

---

## ✅ Checklist de Ejecución

- [ ] MySQL está corriendo (Services → MySQL80)
- [ ] Terminal 1 abierta en `server/`
- [ ] Terminal 2 abierta en raíz `imit_x/`
- [ ] Ejecutar `npm run dev` en Terminal 1 (debe decir "Server listening on port 4000")
- [ ] Ejecutar `npm run dev` en Terminal 2 (debe decir "http://localhost:5173")
- [ ] Abrir navegador en http://localhost:5173
- [ ] ✅ Aplicación funcionando

---

## 📞 Notas Importantes

1. **Terminal 1 y Terminal 2 deben estar ejecutándose simultáneamente**
2. **No cierres ninguna de las dos terminales mientras desarrollas**
3. **Si haces cambios en el código, auto-reload se activará automáticamente**
4. **Para detener un servidor, presiona `Ctrl+C` en la terminal correspondiente**

---

## 🚀 Próximas Sesiones

Para volver a ejecutar el proyecto otra vez:

```bash
# Terminal 1
cd server
npm run dev

# Terminal 2 (en otra terminal)
cd imit_x (o raíz del proyecto)
npm run dev
```

Eso es todo. ✅

---

**Última actualización:** 13 Noviembre 2025

**Estado:** ✅ Listo para ejecutar
