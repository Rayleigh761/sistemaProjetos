const express = require('express');
const db = require('./connConfig/conn');
const app = express();
const port = 3000;
const router = express.Router();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

app.get('/projetos', async (req, res) => {
  try {
    const pool = db.pool;  // Obtém a referência do pool

    // Garante que a conexão esteja aberta
    if (!pool.connected) {
      await db.connect();
    }

    const result = await pool.request().query('SELECT top 1 * FROM tb_tabela');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
