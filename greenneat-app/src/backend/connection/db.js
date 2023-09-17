// configuração do servidor
const express = require("express");
const app = express();
const { Pool } = require("pg");

// cria instância de conexão com o banco
const cliente = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'fatec',
    database: '007'
})

// testa o servidor
app.listen(3001, () => {
    console.log("Servidor sendo executado");
});

module.exports = { app }
module.exports = { cliente }