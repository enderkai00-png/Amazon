# 🧪 Cuentas de Prueba - Amazon 2.0

## ✅ Cuentas Lista para Probar

### 👤 Cuentas de Cliente

| Email | Contraseña | Nombre | Rol |
|-------|-----------|--------|-----|
| `juan@test.com` | `password123` | Juan Pérez | Cliente |
| `maria@test.com` | `password123` | María García | Cliente |
| `carlos@test.com` | `password123` | Carlos López | Cliente |

### 🏪 Cuentas de Vendedor

| Email | Contraseña | Nombre | Rol |
|-------|-----------|--------|-----|
| `vendedor@test.com` | `password123` | Tienda Tech | Vendedor |
| `superventas@test.com` | `password123` | Super Ventas | Vendedor |

---

## 📋 Cómo Usar las Cuentas

### 1. Abrir la App
```
http://localhost:5173/
```

### 2. Seleccionar Tipo de Cuenta
- **Cliente**: Para comprar productos
- **Vendedor**: Para gestionar tienda

### 3. Ingresa Credenciales
- Email: `juan@test.com` (o cualquiera de arriba)
- Contraseña: `password123`

### 4. ¡Listo!
- Explora productos
- Agrega al carrito
- Haz checkout
- Ve configuración

---

## 🎯 Qué Probar

### Como Cliente ✅
1. [ ] Inicia sesión
2. [ ] Ve productos en `/productos`
3. [ ] Agrega items al carrito
4. [ ] Ve carrito en `/carrito`
5. [ ] Haz checkout en `/checkout`
6. [ ] Ve configuración en `/configuracion`
7. [ ] Cierra sesión

### Como Vendedor ✅
1. [ ] Inicia sesión como vendedor
2. [ ] Ve panel en `/vendedores`
3. [ ] Edita precios de tus productos
4. [ ] Ve cambios guardados

---

## 🗄️ Insertar Cuentas en Base de Datos

Si aún no tienes las cuentas en la BD:

### Opción 1: Ejecutar SQL Directamente
```bash
# En MySQL CLI
mysql -u root -p amazon < server/test_accounts.sql
```

### Opción 2: Copiar y Pegar en MySQL Workbench
1. Abre MySQL Workbench
2. Conecta a tu servidor
3. Abre archivo: `server/test_accounts.sql`
4. Ejecuta (Ctrl+Enter)

### Opción 3: Copiar Comandos Individuales
```sql
-- Cuentas de Cliente
INSERT INTO clients (name, email, password) VALUES
('Juan Pérez', 'juan@test.com', 'password123'),
('María García', 'maria@test.com', 'password123'),
('Carlos López', 'carlos@test.com', 'password123');

-- Cuentas de Vendedor
INSERT INTO sellers (name, email, password) VALUES
('Tienda Tech', 'vendedor@test.com', 'password123'),
('Super Ventas', 'superventas@test.com', 'password123');
```

---

## 🚀 Flujo Completo de Prueba

### 1. Inicia Servers
```bash
# Terminal 1: Backend
cd server
npm start

# Terminal 2: Frontend  
npm run dev
```

### 2. Abre App
```
http://localhost:5173
```

### 3. Login como Cliente
- Email: `juan@test.com`
- Contraseña: `password123`
- Rol: **Cliente**

### 4. Explora
- Compra productos
- Agrega al carrito
- Ve /configuracion

### 5. Logout y Login como Vendedor
- Email: `vendedor@test.com`
- Contraseña: `password123`
- Rol: **Vendedor**

### 6. Gestiona Tienda
- Edita precios
- Ve dashboard

---

## 💾 Datos Precargados

### Productos de Prueba (8 total)
- Laptop HP 15" - $799.99
- Mouse Logitech - $29.99
- Teclado Mecánico - $89.99
- Monitor LG 27" - $349.99
- Auriculares Sony - $199.99
- Webcam Logitech - $49.99
- Micrófono USB - $59.99
- Mousepad XXL - $39.99

### Productos por Vendedor
**Vendedor 1 (Tienda Tech):**
- Laptop HP 15" - $799.99
- Monitor LG 27" - $349.99
- Teclado Mecánico RGB - $89.99

**Vendedor 2 (Super Ventas):**
- Auriculares Sony - $199.99
- Mouse Logitech - $29.99
- Webcam Logitech - $49.99

---

## ⚙️ Configuración Requerida

### Variables de Entorno (.env en server/)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=IanZaid0607%
DB_NAME=amazon
PORT=4000
```

### Base de Datos
```sql
CREATE DATABASE amazon;
USE amazon;
-- Luego ejecuta schema.sql
```

---

## 🐛 Si Algo Falla

### Error: "Cannot find user"
- [ ] Verificar que la BD está corriendo
- [ ] Verificar credenciales correctas
- [ ] Ejecutar test_accounts.sql

### Error: "Connection refused"
- [ ] Verificar MySQL está corriendo
- [ ] Verificar Puerto 3306 está abierto
- [ ] Verificar credenciales en .env

### Error: "Invalid credentials"
- [ ] Verificar email exacto (`juan@test.com`)
- [ ] Verificar contraseña exacta (`password123`)
- [ ] Cuentas sensibles a mayúsculas/minúsculas

### Frontend no carga
- [ ] Verificar backend está en puerto 4000
- [ ] Verificar frontend está en puerto 5173
- [ ] Verificar `npm run dev` está ejecutando

---

## 📞 URLs Útiles

| Servicio | URL | Puerto |
|----------|-----|--------|
| Frontend | http://localhost:5173 | 5173 |
| Backend | http://localhost:4000 | 4000 |
| API Health | http://localhost:4000/api/health | 4000 |
| MySQL | localhost | 3306 |

---

## ✨ Características a Probar

### ✅ Autenticación
- Login/Signup
- Persistencia de sesión
- Roles Client/Seller
- Cambiar cuenta

### ✅ Productos
- Búsqueda
- Filtros avanzados
- Detalles del producto
- Rating y stock

### ✅ Carrito
- Agregar productos
- Ver cantidad
- Eliminar items
- Cálculo de totales

### ✅ Checkout
- 4 pasos completos
- Validación de formularios
- Cálculo de IVA
- Confirmación de orden

### ✅ Configuración
- Editar perfil
- Cambiar tema
- Notificaciones
- Logout

### ✅ Vendedor
- Ver dashboard
- Editar precios
- Guardar cambios
- Panel responsive

---

## 🎉 ¡Listo para Probar!

Copia cualquiera de las credenciales arriba y:

1. Abre http://localhost:5173
2. Selecciona Cliente o Vendedor
3. Ingresa email y contraseña
4. ¡Explora!

**Contraseña para todas:** `password123`

---

**Última actualización:** Enero 2025  
**Status:** ✅ Cuentas Listas para Testing
