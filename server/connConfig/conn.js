// app.js
const sql = require('mssql');
const dbConfig = require('./dbConfig');

const pool = new sql.ConnectionPool(dbConfig);

async function connect() {
  try {
    await pool.connect();
    //console.log('Conexão com o banco de dados estabelecida');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados', error);
  }
}

async function close() {
  try {
    await pool.close();
    //console.log('Conexão com o banco de dados fechada');
  } catch (error) {
    console.error('Erro ao fechar a conexão com o banco de dados', error);
  }
}

module.exports = {
  connect,
  close,
  pool,
};
