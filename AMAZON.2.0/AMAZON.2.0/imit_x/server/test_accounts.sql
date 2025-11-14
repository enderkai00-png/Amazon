-- Script de cuentas de prueba para Amazon 2.0
-- Ejecutar en MySQL después de crear la base de datos

-- Cuentas de Cliente de Prueba
INSERT INTO clients (name, email, password) VALUES
('Juan Pérez', 'juan@test.com', 'password123'),
('María García', 'maria@test.com', 'password123'),
('Carlos López', 'carlos@test.com', 'password123');

-- Cuentas de Vendedor de Prueba
INSERT INTO sellers (name, email, password) VALUES
('Tienda Tech', 'vendedor@test.com', 'password123'),
('Super Ventas', 'superventas@test.com', 'password123');

-- Productos de Prueba
INSERT INTO products (id, title, price, category, description, image) VALUES
('1', 'Laptop HP 15"', 799.99, 'Electrónica', 'Laptop HP con procesador Intel i5, 8GB RAM', 'laptop.jpg'),
('2', 'Mouse Logitech', 29.99, 'Accesorios', 'Mouse inalámbrico Logitech MX Master', 'mouse.jpg'),
('3', 'Teclado Mecánico', 89.99, 'Accesorios', 'Teclado mecánico RGB retroiluminado', 'keyboard.jpg'),
('4', 'Monitor LG 27"', 349.99, 'Monitores', 'Monitor 4K LG 27 pulgadas 60Hz', 'monitor.jpg'),
('5', 'Auriculares Sony', 199.99, 'Audio', 'Auriculares con cancelación de ruido Sony WH-1000XM4', 'headphones.jpg'),
('6', 'Webcam Logitech', 49.99, 'Accesorios', 'Webcam 1080p Full HD Logitech', 'webcam.jpg'),
('7', 'Micrófono USB', 59.99, 'Audio', 'Micrófono de condensador USB para streaming', 'microphone.jpg'),
('8', 'Mousepad XXL', 39.99, 'Accesorios', 'Mousepad grande con base antideslizante', 'mousepad.jpg');

-- Productos del Vendedor 1 (Tienda Tech)
INSERT INTO seller_products (id, title, price, site_enabled) VALUES
('P001', 'Laptop HP 15" - Tienda Tech', 799.99, JSON_OBJECT('enabled', true)),
('P002', 'Monitor LG 27" - Tienda Tech', 349.99, JSON_OBJECT('enabled', true)),
('P003', 'Teclado Mecánico RGB', 89.99, JSON_OBJECT('enabled', true));

-- Productos del Vendedor 2 (Super Ventas)
INSERT INTO seller_products (id, title, price, site_enabled) VALUES
('P004', 'Auriculares Sony WH-1000XM4', 199.99, JSON_OBJECT('enabled', true)),
('P005', 'Mouse Logitech MX Master', 29.99, JSON_OBJECT('enabled', true)),
('P006', 'Webcam Logitech 1080p', 49.99, JSON_OBJECT('enabled', true));
