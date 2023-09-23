const express = require("express");
const cors = require("cors");
const { transfer } = require("../functions/transfer/transfer.functions")
const { registerFunction } = require("../functions/register/register.functions");
const app = express();

app.use(cors());
app.use(express.json());

//rota cadastro
app.post('/registerUser', registerFunction);

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