#!/usr/bin/env node

/**
 * Script para insertar cuentas de prueba en la base de datos
 * Uso: node insert_test_accounts.js
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

async function insertTestAccounts() {
  let connection;
  
  try {
    console.log('🔌 Conectando a base de datos...');
    
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'amazon'
    });

    console.log('✅ Conectado a la base de datos\n');

    // Cuentas de Cliente
    console.log('👤 Insertando cuentas de cliente...');
    const clients = [
      ['Juan Pérez', 'juan@test.com', 'password123'],
      ['María García', 'maria@test.com', 'password123'],
      ['Carlos López', 'carlos@test.com', 'password123']
    ];

    for (const [name, email, password] of clients) {
      try {
        await connection.execute(
          'INSERT INTO clients (name, email, password) VALUES (?, ?, ?)',
          [name, email, password]
        );
        console.log(`  ✅ ${name} (${email})`);
      } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.log(`  ⚠️  ${email} ya existe`);
        } else {
          throw err;
        }
      }
    }

    // Cuentas de Vendedor
    console.log('\n🏪 Insertando cuentas de vendedor...');
    const sellers = [
      ['Tienda Tech', 'vendedor@test.com', 'password123'],
      ['Super Ventas', 'superventas@test.com', 'password123']
    ];

    for (const [name, email, password] of sellers) {
      try {
        await connection.execute(
          'INSERT INTO sellers (name, email, password) VALUES (?, ?, ?)',
          [name, email, password]
        );
        console.log(`  ✅ ${name} (${email})`);
      } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.log(`  ⚠️  ${email} ya existe`);
        } else {
          throw err;
        }
      }
    }

    // Productos
    console.log('\n📦 Insertando productos...');
    const products = [
      ['1', 'Laptop HP 15"', 799.99, 'Electrónica', 'Laptop HP con procesador Intel i5, 8GB RAM', 'laptop.jpg'],
      ['2', 'Mouse Logitech', 29.99, 'Accesorios', 'Mouse inalámbrico Logitech MX Master', 'mouse.jpg'],
      ['3', 'Teclado Mecánico', 89.99, 'Accesorios', 'Teclado mecánico RGB retroiluminado', 'keyboard.jpg'],
      ['4', 'Monitor LG 27"', 349.99, 'Monitores', 'Monitor 4K LG 27 pulgadas 60Hz', 'monitor.jpg'],
      ['5', 'Auriculares Sony', 199.99, 'Audio', 'Auriculares con cancelación de ruido Sony WH-1000XM4', 'headphones.jpg'],
      ['6', 'Webcam Logitech', 49.99, 'Accesorios', 'Webcam 1080p Full HD Logitech', 'webcam.jpg'],
      ['7', 'Micrófono USB', 59.99, 'Audio', 'Micrófono de condensador USB para streaming', 'microphone.jpg'],
      ['8', 'Mousepad XXL', 39.99, 'Accesorios', 'Mousepad grande con base antideslizante', 'mousepad.jpg']
    ];

    for (const [id, title, price, category, description, image] of products) {
      try {
        await connection.execute(
          'INSERT INTO products (id, title, price, category, description, image) VALUES (?, ?, ?, ?, ?, ?)',
          [id, title, price, category, description, image]
        );
        console.log(`  ✅ ${title} - $${price}`);
      } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.log(`  ⚠️  ${title} ya existe`);
        } else {
          throw err;
        }
      }
    }

    console.log('\n✨ ¡Cuentas de prueba insertadas exitosamente!\n');
    console.log('📋 Usa estas credenciales para probar:\n');
    
    console.log('👤 Cuentas de Cliente:');
    console.log('   Email: juan@test.com | Contraseña: password123');
    console.log('   Email: maria@test.com | Contraseña: password123');
    console.log('   Email: carlos@test.com | Contraseña: password123\n');
    
    console.log('🏪 Cuentas de Vendedor:');
    console.log('   Email: vendedor@test.com | Contraseña: password123');
    console.log('   Email: superventas@test.com | Contraseña: password123\n');

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Desconectado de la base de datos');
    }
  }
}

// Ejecutar
insertTestAccounts();
