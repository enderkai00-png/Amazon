const pool = require('./db');

(async () => {
  try {
    const [rows] = await pool.query('SELECT id,nombre,apellido,ciudad,codigo_postal,created_at FROM addresses ORDER BY id DESC LIMIT 10');
    console.log(rows);
    process.exit(0);
  } catch (err) {
    console.error('Error querying addresses:', err.message || err);
    process.exit(1);
  }
})();
