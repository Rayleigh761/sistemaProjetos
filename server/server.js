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

app.use(express.json());

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

app.get('/bibliotecas/:status', async (req, res) => {
  try {

    const { status } = req.params; // Obtém o ID da URL
    const pool = db.pool;  // Obtém a referência do pool
    // Garante que a conexão esteja aberta
    if (!pool.connected) {
      await db.connect();
    }
    const result = await pool.request().input('status', status).query('PROJETOS.[dbo].[proc_biblioteca_Sistema_projetos] @opcao = "getStatus", @cd_status = @status');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/:bibliotecas', async (req, res) => {
  try {

    const { bibliotecas } = req.params; // Obtém o ID da URL
    const pool = db.pool;  // Obtém a referência do pool
    // Garante que a conexão esteja aberta
    if (!pool.connected) {
      await db.connect();
    }

    //const result = await pool.request().query(`PROJETOS.[dbo].[proc_biblioteca_Sistema_projetos] @opcao = 'getAnalistas'`);
    const result = await pool.request().input('bibliotecas', bibliotecas).query('PROJETOS.[dbo].[proc_biblioteca_Sistema_projetos] @opcao = @bibliotecas');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/analista/:id', async (req, res) => {
  try {

    const { id } = req.params; // Obtém o ID da URL
    const pool = db.pool;  // Obtém a referência do pool
    // Garante que a conexão esteja aberta
    if (!pool.connected) {
      await db.connect();
    }
    const result = await pool.request().input('id', id).query('PROJETOS.[dbo].[proc_Infos_Responsaveis_Projetos] @opcao = "getInfosProjeto", @cd_projeto = @id');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/analista', async (req, res) => {
  try {
    // Supondo que os dados para inserção estejam no corpo da requisição

    const pool = db.pool; // Obtém a referência do pool
    // Garante que a conexão esteja aberta
    if (!pool.connected) {
      await db.connect();
    }

    const payload = req.body;

    const queryString = `
      EXEC proc_Infos_Responsaveis_Projetos @opcao = 'postInfosProjeto',
      @CD_Projeto = '${payload.cd_projeto}',
      @CD_Analista = '${payload.cd_analista}',
      @CD_Tipo_Area = '${payload.cd_tipo_area}',
      @CD_Tipo_Tecnologia = '${payload.cd_tipo_tecnologia}',
      @QTD_Dias = '${payload.qtd_dias}',
      @QTD_Dias_Real = '${payload.qtd_dias_real}',
      @DT_Inicio = '${payload.dt_inicio}',
      @DT_Inicio_Real = '${payload.dt_inicio_real}',
      @DT_Prazo = '${payload.dt_prazo}',
      @DT_Prazo_Real = '${payload.dt_prazo_real}',
      @CD_Usuario_Cadastro = '1'
    `;
    console.log(queryString);

    // Executa a query com os parâmetros
    await pool.request().query(queryString);

    res.status(201).json({ message: 'Inserção realizada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/analista/:id', async (req, res) => {
  try {

    const { id } = req.params; // Obtém o ID da URL
    const pool = db.pool;  // Obtém a referência do pool
    // Garante que a conexão esteja aberta
    if (!pool.connected) {
      await db.connect();
    }
    const result = await pool.request().input('id', id).query('PROJETOS.[dbo].[proc_Infos_Responsaveis_Projetos] @opcao = "deleteInfoProjeto", @CD_Info_Responsavel_Projeto = @id');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/analista/edit/:id', async (req, res) => {
  try {

    const { id } = req.params; // Obtém o ID da URL
    const pool = db.pool;  // Obtém a referência do pool
    // Garante que a conexão esteja aberta
    if (!pool.connected) {
      await db.connect();
    }
    const result = await pool.request().input('id', id).query('PROJETOS.[dbo].[proc_Infos_Responsaveis_Projetos] @opcao = "getInfosProjetoEdit", @CD_Info_Responsavel_Projeto = @id');
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
