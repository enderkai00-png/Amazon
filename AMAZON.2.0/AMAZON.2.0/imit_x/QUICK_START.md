# GUÍA RÁPIDA - Amazon 2.0

## 🚀 Iniciar el Proyecto (Rápido)

### Terminal 1 - Backend
```bash
cd server
npm run dev
# Esperado: "Server listening on port 4000"
```

### Terminal 2 - Frontend
```bash
npm run dev
# Esperado: "VITE ... ready in XXX ms"
# Abrir: http://localhost:5173
```

---

## 📍 Rutas Disponibles

| URL | Descripción | Acceso |
|-----|-------------|--------|
| `/` | 🏠 Página de inicio | Público |
| `/login` | 🔐 Iniciar sesión | Público |
| `/register` | 📝 Crear cuenta | Público |
| `/mi-cuenta` | 👤 Perfil de usuario | Autenticado |
| `/productos` | 🛍️ Catálogo de productos | Público |
| `/producto/:id` | 📦 Detalles del producto | Público |
| `/carrito` | 🛒 Carrito de compras | Anónimo/Autenticado |
| `/checkout` | 💳 Proceso de compra | Anónimo/Autenticado |
| `/vendedores` | 👨‍💼 Panel de vendedor | Vendedor |
| `/pedidos` | 📋 Historial de órdenes | Cliente |

---

## 🧪 Cuentas de Prueba

### Cliente
```
Email: cliente@example.com
Password: 123456
```

### Vendedor
```
Email: vendedor@example.com
Password: 123456
```

*Nota: Puedes crear nuevas cuentas en `/register`*

---

## 🔗 Endpoints de API (Rápidos)

### Cart
```bash
# Agregar al carrito
POST http://localhost:4000/api/cart
Body: {"client_id": "123", "product_id": "1", "quantity": 1}

# Obtener carrito
GET http://localhost:4000/api/cart/123

# Eliminar del carrito
DELETE http://localhost:4000/api/cart/ITEM_ID
```

### Productos
```bash
# Listar todos
GET http://localhost:4000/api/products

# Buscar y filtrar
GET http://localhost:4000/api/products?q=laptop&category=electronics

# Detalles
GET http://localhost:4000/api/products/1
```

### Direcciones
```bash
# Guardar dirección
POST http://localhost:4000/api/addresses
Body: {
  "client_id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "direccion": "Calle Principal 123",
  "ciudad": "Madrid"
}
```

---

## 🗄️ Base de Datos

### Conectar a MySQL
```bash
mysql -u root -p amazon
# Password: IanZaid0607%
```

### Ver tabla de carrito
```sql
SELECT * FROM carts;
SELECT * FROM addresses;
SELECT * FROM clients;
```

### Limpiar carrito (reset)
```sql
DELETE FROM carts;
```

---

## 🐛 Troubleshooting Rápido

### ❌ "Port 4000 already in use"
```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID XXXX /F
```

### ❌ "Cannot connect to MySQL"
1. Verificar archivo `server/.env`:
   ```env
   DB_PASSWORD=IanZaid0607%
   ```
2. Iniciar MySQL:
   - Windows: Services → MySQL80
   - O usar: `mysql.server start` (Mac/Linux)

### ❌ "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ Carrito vacío después de reload
- Esto es normal (localStorage se borra si limpias datos)
- Los items persisten si el navegador mantiene localStorage

---

## 📁 Estructura Importante

```
imit_x/
├── src/
│   ├── pages/
│   │   ├── Home.tsx          # 🏠 Inicio
│   │   ├── Login.tsx         # 🔐 Nuevo
│   │   ├── Register.tsx      # 📝 Nuevo
│   │   ├── Profile.tsx       # 👤 Nuevo
│   │   ├── Checkout.tsx      # 💳 Nuevo
│   │   └── OrderHistory.tsx  # 📋 Nuevo
│   │
│   ├── interfaz-productos/
│   │   ├── ProductList.tsx   # Catálogo
│   │   ├── ProductDetail.tsx # Detalles
│   │   └── carrito/
│   │       └── Carrito.tsx   # 🛒 Carrito
│   │
│   └── services/
│       └── cart.service.ts   # API calls
│
└── server/
    ├── index.js              # 🖥️ Servidor
    ├── db.js                 # MySQL
    ├── .env                  # Credenciales
    └── schema.sql            # BD esquema
```

---

## 🎨 Colores del Proyecto

| Color | Valor | Uso |
|-------|-------|-----|
| Azul Primario | `#131921` | Headers, botones principales |
| Naranja/Amarillo | `#ff9900` | Precios, acentos |
| Blanco | `#ffffff` | Fondos, cards |
| Gris Texto | `#666666` | Texto secundario |
| Éxito | `#4CAF50` | Confirmaciones |
| Peligro | `#f44336` | Errores |

---

## 📊 Flujo de Compra

```
1. INICIO (/)
   ↓
2. BROWSEAR PRODUCTOS (/productos)
   ↓
3. VER DETALLES (/producto/:id)
   ↓
4. AGREGAR AL CARRITO (icon en header)
   ↓
5. IR AL CARRITO (/carrito)
   ↓
6. CHECKOUT (/checkout)
   ├─ Paso 1: Revisar Carrito
   ├─ Paso 2: Información de Envío
   ├─ Paso 3: Método de Pago
   └─ Paso 4: Confirmación
   ↓
7. VER ÓRDENES (/pedidos)
```

---

## 🛠️ Comandos Útiles

### Frontend
```bash
npm install              # Instalar dependencias
npm run dev             # Iniciar servidor de desarrollo
npm run build           # Compilar para producción
npm run preview         # Vista previa de build
```

### Backend
```bash
npm install             # Instalar dependencias
npm run dev             # Iniciar con nodemon
npm start               # Iniciar sin nodemon
node run_schema.js      # Aplicar esquema SQL
```

---

## 💾 Archivos de Fallback (JSON)

Si MySQL no responde, la app usa:
- `server/cart.json` - Carrito
- `server/addresses.json` - Direcciones
- `server/products.json` - Productos de vendedor

Esto permite que la app siga funcionando sin BD.

---

## 🔐 Credenciales Importantes

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=IanZaid0607%
DB_NAME=amazon
PORT=4000
```

---

## 📱 Responsive Design

- ✅ Mobile-first con Ionic
- ✅ Tablet optimizado
- ✅ Desktop completo
- ✅ Todos los componentes IonCard, IonButton, etc. son responsive

---

## 🎯 Características Clave

### ✅ Carrito
- Agregar/remover items
- Cálculo automático de IVA (19%)
- Persistencia en localStorage
- Sincronización con servidor

### ✅ Vendedor
- Ver productos propios
- Editar precios
- Guardar cambios
- Historial en BD

### ✅ Cliente
- Registrarse/Login
- Editar perfil
- Ver órdenes
- Checkout completo

### ✅ Checkout
- 4 pasos visuales
- Validación completa
- Cálculo de impuestos
- Confirmación de orden

---

## 📞 Soporte Rápido

**¿El carrito no carga?**
- Revisar console (F12) para errores
- Verificar que localhost:4000 está corriendo
- Limpiar localStorage: `localStorage.clear()`

**¿La BD no conecta?**
- Verificar credenciales en `.env`
- Revisar que MySQL está iniciado
- Revisar puerto 3306

**¿Compila pero no muestra contenido?**
- Hard refresh: `Ctrl+Shift+R`
- Limpiar cache: Settings → Clear cache
- Reiniciar servidor

---

**Última Actualización:** 13 Nov 2025

**¡Disfruta desarrollando con Amazon 2.0! 🚀**
