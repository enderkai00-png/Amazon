# 🎉 SISTEMA LISTO PARA PROBAR - Credenciales de Prueba

## ✅ Estado Actual

- ✅ Compilación exitosa (0 errores)
- ✅ Servidor backend corriendo en http://localhost:4000
- ✅ Servidor frontend corriendo en http://localhost:5173
- ✅ Base de datos MySQL conectada
- ✅ Cuentas de prueba insertadas

---

## 🔓 CREDENCIALES PARA PROBAR

### 👤 Cuentas de Cliente (COMPRADOR)

Usa cualquiera de estas para comprar:

```
Email:       juan@test.com
Contraseña:  password123
Rol:         Cliente
```

```
Email:       maria@test.com
Contraseña:  password123
Rol:         Cliente
```

```
Email:       carlos@test.com
Contraseña:  password123
Rol:         Cliente
```

### 🏪 Cuentas de Vendedor

Usa estas para gestionar tienda:

```
Email:       vendedor@test.com
Contraseña:  password123
Rol:         Vendedor
```

```
Email:       superventas@test.com
Contraseña:  password123
Rol:         Vendedor
```

---

## 🚀 CÓMO PROBAR

### Paso 1: Abre la App
```
http://localhost:5173
```

### Paso 2: Selecciona Tipo de Cuenta
- **CLIENTE** - Para comprar productos
- **VENDEDOR** - Para gestionar tienda

### Paso 3: Ingresa Credenciales
- Email: `juan@test.com` (o cualquiera de arriba)
- Contraseña: `password123`

### Paso 4: ¡Explora!

---

## 📋 CHECKLIST DE PRUEBAS

### Como Cliente ✅
- [ ] Inicia sesión
- [ ] Ves tu nombre en el header
- [ ] Ves el rol "Cliente" en el header
- [ ] Explora productos en `/productos`
- [ ] Buscas productos (barra de búsqueda)
- [ ] Usas filtros avanzados (categoría, precio, rating)
- [ ] Agregas items al carrito
- [ ] Ves carrito con cantidad en header
- [ ] Eliminas items del carrito
- [ ] Haces checkout de 4 pasos
- [ ] Completas una compra
- [ ] Vas a `/configuracion`
- [ ] Ves tu perfil
- [ ] Editas información
- [ ] Cierras sesión

### Como Vendedor ✅
- [ ] Inicia sesión como vendedor
- [ ] Ves tu nombre en el header
- [ ] Ves el rol "Vendedor" en el header
- [ ] Vas a `/vendedores`
- [ ] Ves tus productos
- [ ] Editas precios
- [ ] Guardas cambios
- [ ] Ves cambios persistidos

---

## 🎯 FLUJO COMPLETO RECOMENDADO

### 1. Login como Cliente
```
Email: juan@test.com
Contraseña: password123
Rol: Cliente
```
✅ Ver home
✅ Explorar productos
✅ Agregar 3-4 items al carrito
✅ Ir a carrito
✅ Hacer checkout
✅ Completar compra

### 2. Cambiar a Vendedor
```
Ir a /configuracion
Click "Cambiar de Cuenta"
Email: vendedor@test.com
Contraseña: password123
Rol: Vendedor
```
✅ Ver dashboard vendedor
✅ Editar precios
✅ Guardar cambios

### 3. Back a Cliente
```
Repetir paso 1
```

---

## 📊 PRODUCTOS DISPONIBLES

8 productos en el catálogo:

1. **Laptop HP 15"** - $799.99 - Electrónica
2. **Mouse Logitech** - $29.99 - Accesorios
3. **Teclado Mecánico** - $89.99 - Accesorios
4. **Monitor LG 27"** - $349.99 - Monitores
5. **Auriculares Sony** - $199.99 - Audio
6. **Webcam Logitech** - $49.99 - Accesorios
7. **Micrófono USB** - $59.99 - Audio
8. **Mousepad XXL** - $39.99 - Accesorios

---

## 🔧 VERIFICAR SERVIDORES

### Backend Corriendo?
```
http://localhost:4000/api/health
```
Debería mostrar: `{"ok":true}`

### Frontend Corriendo?
```
http://localhost:5173/
```
Debería mostrar: Página de login

---

## 🐛 SI ALGO FALLA

### "Cannot login"
- [ ] Verifica que los servers estén corriendo
- [ ] Usa exactamente: `juan@test.com` y `password123`
- [ ] Selecciona el rol correcto (Cliente/Vendedor)

### "Server connection error"
- [ ] Verifica que backend está en puerto 4000
- [ ] Verifica que MySQL está corriendo
- [ ] Revisa archivo `.env` en server/

### "Frontend no carga"
- [ ] Verifica http://localhost:5173
- [ ] Recarga la página (Ctrl+R)
- [ ] Limpia localStorage (F12 > Application > Local Storage)

---

## 💾 DATOS GUARDADOS

- ✅ Sesiones en localStorage
- ✅ Carrito en localStorage + base de datos
- ✅ Órdenes en base de datos
- ✅ Perfiles en base de datos

---

## 🎨 FEATURES A PROBAR

✅ **Autenticación**
- Login/Signup
- Roles Cliente/Vendedor
- Persistencia de sesión
- Cambiar cuenta

✅ **Productos**
- Búsqueda en tiempo real
- Filtros avanzados (categoría, precio, rating)
- Detalles del producto
- Stock disponible

✅ **Carrito**
- Agregar productos
- Ver cantidad en badge
- Eliminar items
- Cálculo de totales

✅ **Checkout**
- 4 pasos completos
- Validación de formularios
- Cálculo de IVA (19%)
- Confirmación de orden

✅ **Configuración**
- Editar perfil
- Cambiar tema (claro/oscuro)
- Recibir notificaciones
- Cambiar cuenta
- Cerrar sesión

✅ **Vendedor**
- Ver dashboard
- Editar precios
- Guardar cambios
- Panel responsive

---

## 📱 URLS ÚTILES

| Página | URL |
|--------|-----|
| Home | http://localhost:5173 |
| Productos | http://localhost:5173/productos |
| Configuración | http://localhost:5173/configuracion |
| Carrito | http://localhost:5173/carrito |
| Vendedores | http://localhost:5173/vendedores |
| Checkout | http://localhost:5173/checkout |

---

## 🎓 NOTAS IMPORTANTES

### Contraseña Universal
**Todas las cuentas usan:** `password123`

### Autenticación
- Las credenciales se validan contra la base de datos
- Las sesiones se guardan en localStorage
- Las sesiones persisten después de recargar

### Roles
- **Cliente**: Puede comprar, ver perfil, historial de órdenes
- **Vendedor**: Puede gestionar tienda, editar precios

### Persistencia
- Sesión en localStorage con clave `auth_data`
- Carrito en localStorage y BD
- Órdenes en base de datos MySQL

---

## ✨ ¡LISTO PARA USAR!

Abre http://localhost:5173 y:

1. Selecciona **Cliente** o **Vendedor**
2. Ingresa cualquiera de las credenciales arriba
3. ¡Explora!

**Contraseña para todas:** `password123`

---

**Status:** ✅ 100% Funcional  
**Última actualización:** Enero 2025  
**Versión:** 2.0 Completa
