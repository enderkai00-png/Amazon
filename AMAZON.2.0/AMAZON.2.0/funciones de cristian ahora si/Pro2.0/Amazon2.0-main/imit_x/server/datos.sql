INSERT INTO clients (name, email, password) VALUES
('María González', 'maria.gonzalez@email.com', 'clave123'),
('Carlos Rodríguez', 'carlos.rodriguez@email.com', 'securepass456'),
('Ana Martínez', 'ana.martinez@email.com', 'password789'),
('Luis Sánchez', 'luis.sanchez@email.com', 'mipass2024'),
('Elena Torres', 'elena.torres@email.com', 'torrespass'),
('Javier López', 'javier.lopez@email.com', 'javier123'),
('Sofía Ramírez', 'sofia.ramirez@email.com', 'sofiaSecure'),
('Miguel Díaz', 'miguel.diaz@email.com', 'diazmiguel'),
('Laura Herrera', 'laura.herrera@email.com', 'herreraPass'),
('David Castro', 'david.castro@email.com', 'castroDavid');

INSERT INTO sellers (name, email, password) VALUES
('TechWorld', 'ventas@techworld.com', 'sellerpass123'),
('ModaExpress', 'contacto@modaexpress.com', 'modapass456'),
('LibrosYMas', 'info@librosymas.com', 'libros789'),
('DeportesTotal', 'ventas@deportestotal.com', 'deportes2024'),
('HogarConfort', 'hogar@confort.com', 'hogarpass'),
('ElectroShop', 'sales@electroshop.com', 'electro123'),
('BellezaNatural', 'belleza@natural.com', 'bellezaSecure'),
('JuguetesKids', 'info@jugueteskids.com', 'kidsjuguetes'),
('SuperMercado', 'admin@supermercado.com', 'superpass'),
('MundoGamer', 'gaming@mundogamer.com', 'gamerpass');

INSERT INTO products (seller_id, title, description, price, category, image) VALUES
(1, 'Smartphone Samsung Galaxy S23', 'Teléfono inteligente con 128GB almacenamiento', 8999.99, 'Electrónicos', 'https://example.com/samsung-s23.jpg'),
(2, 'Zapatillas Running Nike Air', 'Zapatillas deportivas para running talla 42', 129.99, 'Ropa Deportiva', 'https://example.com/nike-air.jpg'),
(3, 'El Principito - Antoine', 'Clásico de la literatura infantil y juvenil', 15.50, 'Libros', 'https://example.com/principito.jpg'),
(4, 'Pelota de Fútbol Adidas', 'Pelota oficial tamaño 5 para partidos', 29.99, 'Deportes', 'https://example.com/pelota-adidas.jpg'),
(5, 'Sofá 3 Plazas Gris', 'Sofá moderno para sala de estar', 450.00, 'Hogar', 'https://example.com/sofa-gris.jpg'),
(6, 'Laptop HP Pavilion', 'Laptop 15.6 pulgadas, 8GB RAM, 512GB SSD', 699.99, 'Computadoras', 'https://example.com/hp-pavilion.jpg'),
(7, 'Kit Maquillaje Profesional', 'Set completo de maquillaje de 12 piezas', 89.99, 'Belleza', 'https://example.com/kit-maquillaje.jpg'),
(8, 'Lego Star Wars Millennium', 'Set de construcción de 1350 piezas', 159.99, 'Juguetes', 'https://example.com/lego-millennium.jpg'),
(9, 'Aceite de Oliva Extra Virgen', 'Aceite premium 1 litro origen español', 12.99, 'Alimentos', 'https://example.com/aceite-oliva.jpg'),
(1, 'Tablet iPad Air', 'Tablet Apple iPad Air 64GB Wi-Fi', 599.99, 'Electrónicos', 'https://example.com/ipad-air.jpg');

INSERT INTO carts (client_id, product_id, quantity) VALUES
(1, 3, 2),   -- María lleva 2 libros de El Principito
(1, 5, 1),   -- María lleva 1 sofá
(2, 1, 1),   -- Carlos lleva 1 smartphone
(2, 6, 1),   -- Carlos lleva 1 laptop
(3, 2, 1),   -- Ana lleva 1 par de zapatillas
(4, 4, 3),   -- Luis lleva 3 pelotas de fútbol
(5, 7, 1),   -- Elena lleva 1 kit de maquillaje
(6, 8, 2),   -- Javier lleva 2 sets de Lego
(7, 9, 5),   -- Sofía lleva 5 botellas de aceite
(8, 10, 1);  -- Miguel lleva 1 tablet

