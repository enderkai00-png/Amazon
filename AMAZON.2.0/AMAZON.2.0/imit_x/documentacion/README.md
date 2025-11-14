````markdown
# Amazon 2.0 - E-Commerce Platform

## 📋 Descripción General

**Amazon 2.0** es una plataforma de e-commerce moderna desarrollada con **React**, **Ionic**, **TypeScript**, **Vite** y **Node.js**. La aplicación proporciona un sistema completo para clientes, vendedores, gestión de productos, carrito de compras, y procesamiento de órdenes.

**Estado:** ✅ Completamente Funcional

---

## 🎯 Características Principales

### Para Clientes
- ✅ **Autenticación**: Registro e inicio de sesión seguro
- ✅ **Catálogo de Productos**: Visualización con búsqueda y filtros avanzados
- ✅ **Carrito de Compras**: Agregar/remover productos, visualización en tiempo real
- ✅ **Checkout Completo**: Proceso de 4 pasos (carrito → envío → pago → confirmación)
- ✅ **Gestión de Perfil**: Editar información personal y preferencias
- ✅ **Historial de Órdenes**: Ver compras anteriores con estado de envío
- ✅ **Direcciones de Envío**: Guardar y gestionar direcciones

### Para Vendedores
- ✅ **Panel de Vendedor**: Gestión de productos propios
- ✅ **Actualización de Precios**: Modificar precios en tiempo real
- ✅ **Persistencia en Base de Datos**: Sincronización con MySQL
- ✅ **Fallback a Archivos**: Si la BD falla, los datos se guardan en JSON

### Backend (API REST)
- ✅ **Autenticación**: Endpoints para signup/login de clientes y vendedores
- ✅ **Productos**: CRUD completo, búsqueda y filtros
- ✅ **Carrito**: Agregar, obtener, eliminar items
- ✅ **Direcciones**: Guardar información de envío
- ✅ **Órdenes**: Crear y consultar órdenes
- ✅ **Resiliencia**: DB con fallback automático a JSON

---

## 🛠️ Stack Tecnológico

### Frontend
```json
{
  "framework": "React 18",
  "ui": "Ionic React",
  "language": "TypeScript",
  "bundler": "Vite",
  "router": "React Router v5",
  "styling": "CSS + Ionic Components"
}
```

### Backend
```json
{
  "runtime": "Node.js",
  "framework": "Express.js",
  "database": "MySQL 8.x",
  "database_client": "mysql2/promise",
  "dev_server": "nodemon"
}
```

### Base de Datos
- **Sistema**: MySQL 8.x
- **Host**: localhost:3306
- **Usuario**: root
- **Base de Datos**: amazon
- **Conexión**: Pool de conexiones con soporte promise

---

## 📁 Estructura del Proyecto

```
amazon2.0/
├── src/
│   ├── pages/                      # Páginas principales
│   │   ├── Home.tsx                # Página de inicio
│   │   ├── Login.tsx               # ✨ NUEVA - Autenticación de usuarios
│   │   ├── Register.tsx            # ✨ NUEVA - Registro de nuevas cuentas
│   │   ├── Profile.tsx             # ✨ NUEVA - Gestión de perfil de usuario
│   │   ├── OrderHistory.tsx        # ✨ NUEVA - Historial de órdenes
│   │   ├── Checkout.tsx            # ✨ NUEVA - Proceso de compra
│   │   ├── productos.tsx           # Página de productos
│   │   └── Vendedores.tsx          # Página de vendedores
│   │
│   ├── components/                 # Componentes reutilizables
│   │   ├── AmazonHeader.tsx        # Header con logo, búsqueda, carrito
│   │   ├── AmazonFilterComponent.tsx
│   │   ├── FilterComponent.tsx
│   │   ├── ProductCard.tsx
│   │   ├── SellerDashboard.tsx
│   │   └── ExploreContainer.tsx
│   │
│   ├── interfaz-productos/         # Productos relacionados
│   │   ├── ProductList.tsx         # Catálogo de productos
│   │   ├── ProductDetail.tsx       # Detalles del producto
│   │   ├── types.ts                # Interfaces de TypeScript
│   │   ├── ProductList.css
│   │   ├── ProductDetail.css
│   │   │
│   │   ├── carrito/                # Componentes del carrito
│   │   │   ├── Carrito.tsx         # Vista del carrito
│   │   │   └── carrito.css
│   │   │
│   │   └── formularios/            # Formularios
│   │       └── AddressForm.tsx     # Formulario de dirección
│   │
│   ├── interfaz-vendedores/        # Vendedores relacionados
│   │   ├── SellerDashboard.tsx     # Panel del vendedor
│   │   ├── SellerDashboard.css
│   │   └── Vendedores.tsx
│   │
│   ├── services/                   # Servicios de API
│   │   ├── cart.service.ts         # Gestión del carrito
│   │   ├── product.service.ts
│   │   └── filter.service.ts
│   │
│   ├── theme/
│   │   └── variables.css           # Colores y estilos globales
│   │
│   ├── App.tsx                     # Componente raíz
│   └── main.tsx                    # Punto de entrada
│
├── server/                         # Backend Node.js
│   ├── index.js                    # Servidor Express principal
│   ├── db.js                       # Configuración de conexión MySQL
│   ├── run_schema.js               # Script para aplicar esquema
│   ├── .env                        # Variables de entorno
│   │
│   ├── schema.sql                  # Esquema de base de datos
│   │
│   ├── basesdedatos/               # Datos iniciales
│   │   ├── clientes.json
│   │   ├── productos.json
│   │   └── vendedores.json
│   │
│   ├── addresses.json              # Fallback: direcciones guardadas
│   ├── products.json               # Fallback: productos de vendedores
│   ├── cart.json                   # Fallback: carrito guardado
│   │
│   └── package.json                # Dependencias del servidor
│
├── package.json                    # Dependencias del frontend
├── vite.config.ts                  # Configuración de Vite
├── tsconfig.json                   # Configuración de TypeScript
└── README.md                       # Este archivo
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- **Node.js** v16+ (recomendado v18+)
- **npm** v8+
- **MySQL** 8.x corriendo localmente
- **Git** (opcional)

### Pasos de Instalación

#### 1. Instalar Dependencias del Frontend
```bash
cd C:\Users\ianca\Downloads\Amazon2.01\Amazon2.01\Amazon2.0\imit_x
npm install
```

#### 2. Instalar Dependencias del Backend
```bash
cd server
npm install
```

#### 3. Configurar Base de Datos

Crear archivo `.env` en la carpeta `server/`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=IanZaid0607%
DB_NAME=amazon
PORT=4000
```

Aplicar el esquema SQL:
```bash
cd server
node run_schema.js
```

#### 4. Iniciar el Proyecto

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Servidor escuchando en http://localhost:4000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
# Aplicación en http://localhost:5173
```

---

## 📊 Endpoints de la API

### Autenticación
```
POST /api/auth/signup       - Crear nueva cuenta
POST /api/auth/login        - Iniciar sesión
```

### Productos
```
GET  /api/products          - Listar todos los productos
GET  /api/products/:id      - Obtener detalles de un producto
```

### Carrito
```
POST /api/cart              - Agregar producto al carrito
GET  /api/cart/:clientId    - Obtener carrito del cliente
DELETE /api/cart/:id        - Eliminar item del carrito
```

### Direcciones
```
POST /api/addresses         - Guardar dirección de envío
```

### Vendedor
```
GET  /api/seller/products   - Obtener productos del vendedor
POST /api/seller/products   - Actualizar productos del vendedor
```

---

## 🗄️ Esquema de Base de Datos

### Tabla: `clients`
```sql
CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: `sellers`
```sql
CREATE TABLE sellers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: `products`
```sql
CREATE TABLE products (
  id VARCHAR(50) PRIMARY KEY,
  seller_id INT,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50),
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES sellers(id)
);
```

### Tabla: `carts`
```sql
CREATE TABLE carts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  product_id VARCHAR(50) NOT NULL,
  quantity INT DEFAULT 1,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### Tabla: `addresses`
```sql
CREATE TABLE addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  direccion VARCHAR(200),
  direccion2 VARCHAR(200),
  ciudad VARCHAR(100),
  estado VARCHAR(100),
  pais VARCHAR(100),
  codigo_postal VARCHAR(20),
  telefono VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id)
);
```

### Tabla: `seller_products`
```sql
CREATE TABLE seller_products (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(200),
  price DECIMAL(10, 2),
  site_enabled JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔄 Flujo de Resiliencia (DB + JSON Fallback)

La aplicación implementa un patrón de resiliencia que:

1. **Intenta conectar a MySQL** primero
2. **Si falla**, guarda los datos en archivos JSON
3. **En siguiente consulta**, lee desde JSON si la BD sigue sin responder

### Archivos de Fallback
- `server/cart.json` - Carrito de compras
- `server/addresses.json` - Direcciones de envío
- `server/products.json` - Productos de vendedores

Ejemplo de uso:
```javascript
// En server/index.js
try {
  // Intentar operación en DB
  const [result] = await pool.query('INSERT INTO carts ...');
  res.json(result);
} catch (err) {
  // Fallback a archivo JSON
  const cart = require('./cart.json');
  cart.push(cartItem);
  fs.writeFileSync('./cart.json', JSON.stringify(cart, null, 2));
  res.json({ success: true });
}
```

---

## 🎨 Interfaz de Usuario

### Paleta de Colores
- **Azul Oscuro (Primario)**: `#131921` - Amazon Dark
- **Naranja/Amarillo (Secundario)**: `#ff9900` - Amazon Orange
- **Blanco (Fondo)**: `#ffffff`
- **Gris (Texto)**: `#666666`

### Componentes Ionic Utilizados
- `IonHeader`, `IonToolbar` - Navegación
- `IonCard`, `IonCardContent` - Contenedores
- `IonButton`, `IonInput`, `IonSegment` - Formularios
- `IonList`, `IonItem`, `IonLabel` - Listas
- `IonModal`, `IonAlert`, `IonLoading` - Diálogos
- `IonIcon` - Iconografía con ionicons

---

## 🧪 Testing de Características

### Test: Agregar Producto al Carrito
```bash
# POST http://localhost:4000/api/cart
{
  "client_id": "123",
  "product_id": "PROD-001",
  "quantity": 2
}
```

### Test: Crear Dirección
```bash
# POST http://localhost:4000/api/addresses
{
  "client_id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "direccion": "Calle Principal 123",
  "ciudad": "Madrid"
}
```

---

## 📈 Historial de Desarrollo

### Fase 1: Configuración Inicial ✅
- Instalación de dependencias (frontend y backend)
- Configuración de Vite y TypeScript
- Setup de servidor Express
- Conexión a MySQL

### Fase 2: Interfaz de Vendedores ✅
- Creación de `SellerDashboard.tsx`
- Panel para gestionar productos
- CSS responsive
- Rutas en App.tsx

### Fase 3: Interfaz de Productos ✅
- `ProductList.tsx` con catálogo, búsqueda y filtros
- `ProductDetail.tsx` con modal de dirección
- `AddressForm.tsx` - Validación y persistencia
- Tipos TypeScript en `types.ts`

### Fase 4: Carrito de Compras ✅
- `Carrito.tsx` - Visualización de items
- `cart.service.ts` - Gestión centralizada
- Cálculo automático de totales (subtotal, IVA, total)
- Funcionalidad de eliminar items
- Persistencia con cliente_id en localStorage

### Fase 5: Persistencia en Base de Datos ✅
- Endpoints `/api/cart`, `/api/addresses`, `/api/seller/products`
- Esquema SQL en `schema.sql`
- Fallback automático a JSON cuando BD no está disponible
- Script `run_schema.js` para aplicar esquema

### Fase 6: Integración de Carrito en Header ✅
- Icono de carrito en `AmazonHeader.tsx`
- Contador dinámico de items
- Navegación a `/carrito`
- Carga en tiempo real

### Fase 7: Interfaces de Autenticación ✅
- **Login.tsx** - Autenticación de clientes y vendedores
- **Register.tsx** - Registro de nuevas cuentas
- Almacenamiento seguro en localStorage
- Validación de formularios

### Fase 8: Gestión de Perfil ✅
- **Profile.tsx** - Edición de información personal
- Toggle para modo oscuro y notificaciones
- Cierre de sesión
- Avatar personalizado

### Fase 9: Historial de Órdenes ✅
- **OrderHistory.tsx** - Visualización de compras anteriores
- Estados de orden (pendiente, procesando, enviado, entregado)
- Detalles de orden expandibles
- Información de envío

### Fase 10: Checkout Completo ✅
- **Checkout.tsx** - Proceso de 4 pasos:
  1. **Carrito**: Resumen de productos
  2. **Envío**: Formulario de dirección
  3. **Pago**: Selección de método (tarjeta/contra entrega)
  4. **Confirmación**: Resumen final
- Cálculo de totales con IVA
- Navegación entre pasos
- Validación de formularios

---

## 🐛 Solución de Problemas

### Error: "Port 4000 already in use"
```bash
# Buscar proceso usando el puerto
netstat -ano | findstr :4000

# Matar el proceso (Windows)
taskkill /PID <PID> /F
```

### Error: "Access Denied" en MySQL
```bash
# Verificar credenciales en server/.env
# Asegurate de que MySQL está corriendo:
# Services → MySQL80 (debe estar iniciado)
```

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Carrito vacío después de recargar
Los datos se guardan en localStorage bajo `client_id`. Si se borra localStorage, el carrito se pierde. Este es el comportamiento esperado para usuarios anónimos.

---

## 📱 URLs Principales

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio |
| `/login` | Iniciar sesión |
| `/register` | Crear nueva cuenta |
| `/productos` | Catálogo de productos |
| `/producto/:id` | Detalles del producto |
| `/vendedores` | Panel de vendedor |
| `/carrito` | Visualizar carrito |
| `/checkout` | Proceso de compra |
| `/mi-cuenta` | Gestionar perfil |
| `/pedidos` | Historial de órdenes |

---

## 🔐 Seguridad

### Implementado:
- ✅ Validación de formularios en cliente y servidor
- ✅ Almacenamiento de contraseñas (nota: en producción usar bcrypt)
- ✅ Control de acceso por rol (cliente/vendedor)
- ✅ localStorage con client_id para sesiones anónimas
- ✅ CORS habilitado en backend

### Recomendaciones para Producción:
- Usar HTTPS en lugar de HTTP
- Implementar JWT para autenticación
- Hash de contraseñas con bcrypt
- Rate limiting en endpoints
- Validación server-side más estricta
- Variables de entorno seguras

---

## 📦 Dependencias Principales

### Frontend
```json
{
  "@ionic/react": "^8.0.0",
  "react": "^18.2.0",
  "react-router-dom": "^5.3.0",
  "ionicons": "^7.0.0",
  "typescript": "^5.0.0",
  "vite": "^5.0.0"
}
```

### Backend
```json
{
  "express": "^4.18.0",
  "cors": "^2.8.0",
  "mysql2": "^3.0.0",
  "dotenv": "^16.0.0",
  "nodemon": "^3.0.0"
}
```

---

## 🎓 Lecciones Aprendidas

1. **Resiliencia es Clave**: El fallback a JSON salva la aplicación cuando la BD no está disponible
2. **TypeScript Previene Errores**: Los tipos ayudaron a encontrar bugs temprano
3. **LocalStorage para Estado Client**: Perfecto para cart_id sin backend
4. **Ionic es Poderoso**: Componentes responsivos listos para usar
5. **Vite es Rápido**: Hot module replacement hace el desarrollo fluido

---

## 🚧 Mejoras Futuras

- [ ] Pagos reales (Stripe, PayPal)
- [ ] Notificaciones por email
- [ ] Sistema de reseñas
- [ ] Wishlist/Favoritos
- [ ] Búsqueda avanzada con filtros dinámicos
- [ ] Recomendaciones personalizadas
- [ ] Carrito compartido entre dispositivos
- [ ] Two-factor authentication
- [ ] Análisis de ventas para vendedores
- [ ] Panel de admin global

---

## 📞 Contacto & Soporte

Para reportar bugs o sugerencias:
- Abrir un issue en el repositorio
- Contactar al equipo de desarrollo

---

## 📄 Licencia

Este proyecto está bajo licencia **MIT**. Siéntete libre de usarlo y modificarlo.

---

**Última actualización:** Noviembre 13, 2025

**Desarrollado con ❤️ usando React, Ionic y Node.js**

````
