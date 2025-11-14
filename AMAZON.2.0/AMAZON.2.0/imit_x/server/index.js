const express = require('express');
const cors = require('cors');
const pool = require('./db');
const dotenv = require('dotenv');

dotenv.config();

const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Simple health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Auth: signup (role = client|seller)
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ error: 'Missing fields' });
    if (role === 'client') {
      const [r] = await pool.query('INSERT INTO clients (name,email,password) VALUES (?,?,?)', [name, email, password]);
      return res.json({ id: r.insertId, name, email, role: 'client' });
    } else {
      const [r] = await pool.query('INSERT INTO sellers (name,email,password) VALUES (?,?,?)', [name, email, password]);
      return res.json({ id: r.insertId, name, email, role: 'seller' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Auth: login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) return res.status(400).json({ error: 'Missing fields' });
    if (role === 'client') {
      const [rows] = await pool.query('SELECT id,name,email FROM clients WHERE email = ? AND password = ? LIMIT 1', [email, password]);
      if (!rows || rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
      return res.json({ user: rows[0], role: 'client' });
    } else {
      const [rows] = await pool.query('SELECT id,name,email FROM sellers WHERE email = ? AND password = ? LIMIT 1', [email, password]);
      if (!rows || rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
      return res.json({ user: rows[0], role: 'seller' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
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
  const { client_id, product_id, quantity } = req.body;
  if (!client_id || !product_id) return res.status(400).json({ error: 'Missing fields' });

  // Try DB insert first; on failure, fallback to file storage
  try {
    const [r] = await pool.query('INSERT INTO carts (client_id, product_id, quantity) VALUES (?,?,?)', [client_id, product_id, quantity || 1]);
    return res.json({ id: r.insertId, source: 'db' });
  } catch (dbErr) {
    console.warn('DB insert for cart failed, falling back to file:', dbErr.message || dbErr);
    try {
      const filePath = path.join(__dirname, 'cart.json');
      let arr = [];
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8') || '[]';
        try { arr = JSON.parse(raw); } catch (e) { arr = []; }
      }
      const id = Date.now();
      // Try to get product snapshot from products.json to show in UI
      let title = null, price = null, image = null;
      try {
        const prodPath = path.join(__dirname, 'products.json');
        if (fs.existsSync(prodPath)) {
          const prods = JSON.parse(fs.readFileSync(prodPath, 'utf8') || '[]');
          const p = prods.find(x => String(x.id) === String(product_id));
          if (p) { title = p.title || p.nombre || null; price = p.price || p.precio || null; image = p.image || p.imagen || null; }
        }
      } catch (e) {}
      const record = { id, client_id, product_id, quantity: quantity || 1, title, price, image, created_at: new Date().toISOString() };
      arr.push(record);
      fs.writeFileSync(filePath, JSON.stringify(arr, null, 2));
      return res.json({ id, source: 'file' });
    } catch (fileErr) {
      console.error('File fallback for cart failed:', fileErr.message || fileErr);
      return res.status(500).json({ error: 'Server error' });
    }
  }
});

app.get('/api/cart/:clientId', async (req, res) => {
  const clientId = req.params.clientId;
  try {
    const [rows] = await pool.query(
      'SELECT c.id, c.quantity, p.id as product_id, p.title, p.price, p.image FROM carts c JOIN products p ON c.product_id = p.id WHERE c.client_id = ?',
      [clientId]
    );
    return res.json(rows);
  } catch (dbErr) {
    console.warn('DB read for cart failed, falling back to file:', dbErr.message || dbErr);
    try {
      const filePath = path.join(__dirname, 'cart.json');
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8') || '[]';
        const arr = JSON.parse(raw);
        const filtered = arr.filter(r => String(r.client_id) === String(clientId));
        return res.json(filtered);
      }
      return res.json([]);
    } catch (fileErr) {
      console.error('Error reading cart file:', fileErr.message || fileErr);
      return res.status(500).json({ error: 'Server error' });
    }
  }
});

// Remove cart item
app.delete('/api/cart/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [r] = await pool.query('DELETE FROM carts WHERE id = ?', [id]);
    return res.json({ ok: true });
  } catch (err) {
    console.error('Error deleting cart item:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Guardar dirección de entrega
app.post('/api/addresses', async (req, res) => {
  const { client_id, nombre, apellido, direccion, direccion2, ciudad, estado, pais, codigo_postal, telefono } = req.body;
  if (!nombre || !apellido || !direccion || !ciudad || !pais || !codigo_postal) return res.status(400).json({ error: 'Missing fields' });

  // Try DB insert first; if DB unavailable, fallback to a local JSON file for simple testing
  try {
    const [r] = await pool.query(
      'INSERT INTO addresses (client_id,nombre,apellido,direccion,direccion2,ciudad,estado,pais,codigo_postal,telefono) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [client_id || null, nombre, apellido, direccion, direccion2 || null, ciudad, estado || null, pais, codigo_postal, telefono || null]
    );
    return res.json({ id: r.insertId, source: 'db' });
  } catch (err) {
    console.error('DB insert failed, falling back to file store:', err.message || err);
    try {
      const filePath = path.join(__dirname, 'addresses.json');
      let arr = [];
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8') || '[]';
        try { arr = JSON.parse(raw); } catch (e) { arr = []; }
      }
      const id = Date.now();
      const record = {
        id,
        client_id: client_id || null,
        nombre, apellido, direccion, direccion2: direccion2 || null,
        ciudad, estado: estado || null, pais, codigo_postal, telefono: telefono || null,
        created_at: new Date().toISOString()
      };
      arr.push(record);
      fs.writeFileSync(filePath, JSON.stringify(arr, null, 2));
      return res.json({ id, source: 'file' });
    } catch (fileErr) {
      console.error('File fallback failed:', fileErr.message || fileErr);
      return res.status(500).json({ error: 'Server error' });
    }
  }
});

// Seller products: get and save (file-backed simple storage)
app.get('/api/seller/products', async (req, res) => {
  // Try DB first
  try {
    const [rows] = await pool.query('SELECT id, title, price, site_enabled FROM seller_products');
    // parse JSON column if present
    const out = rows.map(r => ({ id: r.id, title: r.title, price: Number(r.price), siteEnabled: r.site_enabled ? JSON.parse(r.site_enabled) : {} }));
    return res.json(out);
  } catch (dbErr) {
    console.warn('DB read for seller products failed, falling back to file:', dbErr.message || dbErr);
    try {
      const filePath = path.join(__dirname, 'products.json');
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8') || '[]';
        const arr = JSON.parse(raw);
        return res.json(arr);
      }
      return res.json([]);
    } catch (err) {
      console.error('Error reading products file:', err.message || err);
      return res.status(500).json({ error: 'Server error' });
    }
  }
});

app.post('/api/seller/products', async (req, res) => {
  const { products } = req.body;
  if (!products || !Array.isArray(products)) return res.status(400).json({ error: 'Invalid payload' });

  // Try DB persist: simple approach - upsert each product
  try {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const insertSql = 'REPLACE INTO seller_products (id,title,price,site_enabled,created_at) VALUES (?,?,?,?,NOW())';
      for (const p of products) {
        const siteJson = JSON.stringify(p.siteEnabled || {});
        await conn.query(insertSql, [p.id, p.title, Number(p.price || 0), siteJson]);
      }
      await conn.commit();
      conn.release();
      return res.json({ ok: true, source: 'db' });
    } catch (inner) {
      await conn.rollback();
      conn.release();
      throw inner;
    }
  } catch (dbErr) {
    console.warn('DB save for seller products failed, falling back to file:', dbErr.message || dbErr);
    try {
      const filePath = path.join(__dirname, 'products.json');
      fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
      return res.json({ ok: true, source: 'file' });
    } catch (fileErr) {
      console.error('Error saving products file:', fileErr.message || fileErr);
      return res.status(500).json({ error: 'Server error' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
