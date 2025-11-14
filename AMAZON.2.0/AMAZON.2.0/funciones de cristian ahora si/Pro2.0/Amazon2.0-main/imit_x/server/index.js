const express = require('express');
const cors = require('cors');
const pool = require('./db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Simple health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Registro de usuario
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, lastName, email, phone, password } = req.body;
    
    if (!name || !lastName || !email || !phone || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    // Verificar si el email ya existe
    const [existing] = await pool.query(
      'SELECT id FROM clients WHERE email = ? UNION SELECT id FROM sellers WHERE email = ?', 
      [email, email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Insertar en clients (por defecto)
    const [result] = await pool.query(
      'INSERT INTO clients (name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)',
      [name, lastName, email, phone, password]
    );

    return res.json({ 
      success: true, 
      message: 'Usuario registrado exitosamente',
      userId: result.insertId 
    });

  } catch (err) {
    console.error('Error en registro:', err);
    return res.status(500).json({ error: 'Error del servidor' });
  }
});

// Login de usuario
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Buscar en clientes
    const [clients] = await pool.query(
      'SELECT id, name, email, user_type FROM clients WHERE email = ? AND password = ? LIMIT 1', 
      [email, password]
    );

    if (clients.length > 0) {
      return res.json({ 
        success: true, 
        user: clients[0], 
        userType: clients[0].user_type 
      });
    }

    // Buscar en vendedores
    const [sellers] = await pool.query(
      'SELECT id, name, email, user_type FROM sellers WHERE email = ? AND password = ? LIMIT 1', 
      [email, password]
    );

    if (sellers.length > 0) {
      return res.json({ 
        success: true, 
        user: sellers[0], 
        userType: sellers[0].user_type 
      });
    }

    return res.status(401).json({ error: 'Credenciales incorrectas' });

  } catch (err) {
    console.error('Error en login:', err);
    return res.status(500).json({ error: 'Error del servidor' });
  }
});

// Actualizar a vendedor
app.post('/api/auth/update-to-seller', async (req, res) => {
  try {
    const { userId, rfc, taxSituation, productsToSell } = req.body;
    
    if (!userId || !rfc || !taxSituation || !productsToSell) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Obtener datos del cliente
    const [clients] = await pool.query(
      'SELECT * FROM clients WHERE id = ?', 
      [userId]
    );

    if (clients.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const client = clients[0];

    // Insertar en sellers
    const [result] = await pool.query(
      `INSERT INTO sellers (name, last_name, email, phone, password, rfc, tax_situation, products_to_sell) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [client.name, client.last_name, client.email, client.phone, client.password, rfc, taxSituation, productsToSell]
    );

    // Opcional: eliminar de clients si se desea
    // await pool.query('DELETE FROM clients WHERE id = ?', [userId]);

    return res.json({ 
      success: true, 
      message: 'Registro de vendedor completado',
      sellerId: result.insertId 
    });

  } catch (err) {
    console.error('Error en actualización a vendedor:', err);
    return res.status(500).json({ error: 'Error del servidor' });
  }
});

// Products listing with search and filters
app.get('/api/products', async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    if (q) {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${q}%`, `%${q}%`);
    }
    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }
    if (minPrice) {
      sql += ' AND price >= ?';
      params.push(Number(minPrice));
    }
    if (maxPrice) {
      sql += ' AND price <= ?';
      params.push(Number(maxPrice));
    }
    sql += ' ORDER BY created_at DESC LIMIT 100';
    const [rows] = await pool.query(sql, params);
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Product detail
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ? LIMIT 1', [id]);
    if (!rows || rows.length === 0) return res.status(404).json({ error: 'Not found' });
    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Cart endpoints
app.post('/api/cart', async (req, res) => {
  try {
    const { client_id, product_id, quantity } = req.body;
    if (!client_id || !product_id) return res.status(400).json({ error: 'Missing fields' });
    const [r] = await pool.query('INSERT INTO carts (client_id, product_id, quantity) VALUES (?,?,?)', [client_id, product_id, quantity || 1]);
    return res.json({ id: r.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/cart/:clientId', async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const [rows] = await pool.query(
      'SELECT c.id, c.quantity, p.id as product_id, p.title, p.price, p.image FROM carts c JOIN products p ON c.product_id = p.id WHERE c.client_id = ?',
      [clientId]
    );
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});