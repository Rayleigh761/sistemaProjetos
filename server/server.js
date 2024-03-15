const express = require('express');
const cors = require('cors');  // Importe o pacote cors
const db = require('./connConfig/conn');
const app = express();
const port = 3000;
const router = express.Router();
const corsOptions = {
  origin: 'http://localhost:4200', // Troque pelo endereço da sua aplicação Angular
  optionsSuccessStatus: 200 // Algumas versões mais antigas do navegador podem precisar disso
};

app.use(cors(corsOptions));


// Adicione o middleware cors
app.use(cors());

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

    const result = await pool.request().query(`PROJETOS.[dbo].[proc_projetos_informacoes_New] @opcao = 'getProjetos'`);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/projetos/:id', async (req, res) => {
  try {

    const { id } = req.params; // Obtém o ID da URL
    const pool = db.pool;  // Obtém a referência do pool
    // Garante que a conexão esteja aberta
    if (!pool.connected) {
      await db.connect();
    }
    const result = await pool.request().input('id', id).query('PROJETOS.[dbo].[proc_projetos_informacoes_New] @opcao = "getProjetosId", @cd_projeto = @id');
    let responseData = result.recordset;
    // Verifica se a resposta é um array com um único objeto
    if (Array.isArray(responseData) && responseData.length === 1) {
      // Ajusta a resposta para ser o objeto em si, não o array
      responseData = responseData[0];
    }

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
