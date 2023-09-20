const express = require("express");
const cors = require("cors");
const { registerSupplier, registerPartner } = require("../functions/register/register.functions");
const { login } = require("../functions/login/login.functions");
const { transfer } = require("../functions/transfer/transfer.functions")
const app = express();

app.use(cors());
app.use(express.json());

//rota de cadastro de estabelecimentos
app.post("/cadastro-estabelecimento", (req, res) => {
    const type_user = 'Estabelecimento';
    const { cnpj_supplier, email_supplier, password_supplier, contact_supplier, district_supplier, address_supplier, num_address_supplier, company_name_supplier, fantasy_name_supplier, createdat, updatedat } = req.body;
    const balance = '0,00';

    console.log(req.body);

    registerSupplier(type_user, cnpj_supplier, email_supplier, password_supplier, contact_supplier, district_supplier, address_supplier, num_address_supplier, company_name_supplier, fantasy_name_supplier, balance, createdat, updatedat, res);
});

//rota de cadastro de parceiros
app.post("/cadastro-parceiro", (req, res) => {
    const type_user = 'Parceiro';
    const { cnpj_partner, cpf_partner, email_partner, password_partner, contact_partner, district_partner, address_partner, num_address_partner, company_name_partner, fantasy_name_partner, createdat, updatedat } = req.body;
    const balance = '0,00';

    console.log(req.body);

    registerPartner(type_user, cnpj_partner, cpf_partner, email_partner, password_partner, contact_partner, district_partner, address_partner, num_address_partner, company_name_partner, fantasy_name_partner, balance, createdat, updatedat, res);
});

//rota de login
app.post("/", (req, res) => {
    // extrai os dados enviados pelo cliente no corpo da requisição e os armazena
    const email_user = req.body.email_user
    const password_user = req.body.password_user

    // invoca a função de login e utiliza os valores da rota como argumentos
    login(email_user, password_user, res)
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