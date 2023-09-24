const express = require("express");
const cors = require("cors");
const { transfer } = require("../functions/transfer/transfer.functions")
const { registerFunction } = require("../functions/register/register.functions");
const { login } = require("../functions/login/login.functions");
const app = express();

app.use(express.json());

var corsOptions = {
    origin: "http://localhost:3000" //front
  };
  
app.use(cors(corsOptions));

//rota cadastro
app.post('/registerUser', registerFunction);

//rota de login
app.post("/", (req, res) => {
    // extrai os dados enviados pelo cliente no corpo da requisição e os armazena
    const email = req.body.email
    const password = req.body.password

    // invoca a função de login e utiliza os valores da rota como argumentos
    login(email, password, res)
});

// Rota para transferencia
app.post('/transfer', async (req, res) => {
    try {
        const { senderType, senderId, receiverType, uniqueKey, transferValue } = req.body;

        // Chama a função transfer com os parâmetros fornecidos
        await transfer(senderType, senderId, receiverType, uniqueKey, transferValue);

        res.status(200).json({ message: 'Transferência concluída com sucesso.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = app;