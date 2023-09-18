// configuração do servidor
const express = require("express");
const app = express();
const { Pool } = require("pg");

// cria instância de conexão com o banco
const cliente = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'isa123',
    database: '007'
})

// testa o servidor
app.listen(3001, () => {
    console.log("Servidor sendo executado");
});


const cors = require('cors')


app.use(cors());
app.use(express.json()); // Para analisar solicitações JSON
app.post('/registerSupplier', registerSupplier);

async function existentSupplierCNPJRegister(cnpj){
    const res = await cliente.query(
        `SELECT * FROM suppliers_users WHERE cnpj_supplier = '${cnpj}'`);

        var response = false
        res.rows.forEach( register => {
            if (register.cnpj_supplier === cnpj) {
                console.log("Já existe um cadastro no CNPJ informado. Por favor digite outro CNPJ.");
                response = true;
            }
        });
        return response;
}

async function existentSupplierEmailRegister(email){
    const res = await cliente.query(
        `SELECT * FROM suppliers_users WHERE email_supplier = '${email}'`);

        var response = false
        res.rows.forEach( register => {
            if (register.email_supplier === cnpj) {
                console.log("Já existe um cadastro no email informado. Por favor digite outro email.");
                response = true;
            }
        });
        return response;
}

async function registerSupplier(req, res){
    const {type,cnpj, email, password, telefone, bairro, endereco, numero, rSocial, nFantasia, balance, createdat, updatedat} = req.body;
    console.log(req.body)

    const existentCnpj = await existentSupplierCNPJRegister(cnpj);
    const existentEmail = await existentSupplierEmailRegister(email);

    if (existentCnpj) {
        res.status(409).send({ msg: "Já existe um registro no CNPJ informado." });
    }

    if (existentEmail) {
        res.status(409).send({ msg: "Já existe um registro no email informado." });
    } else {
        try {
            const SQL = `
                INSERT INTO
                suppliers_users("type_user","cnpj_supplier","email_supplier","password_supplier","contact_supplier", "district_supplier","address_supplier","num_address_supplier","company_name_supplier", "fantasy_name_supplier", "balance_supplier", "createdat", "updatedat")
                VALUES ('${type}','${cnpj}','${email}','${password}','${telefone}', '${bairro}','${endereco}','${numero}', '${rSocial}',' ${nFantasia}', '${balance}', '${createdat}', '${updatedat}')`
            const resultado = await cliente.query(SQL);
            console.log("Cadastro realizado com sucesso!");
            res.send({ msg: "Cadastro realizado com sucesso!" });
        } catch (error) {
            console.error("Erro ao cadastrar estabelecimento:", error);
            res.status(500).send({ msg: "Erro ao cadastrar." });
        }
    }
}


module.exports = { app }
module.exports = { cliente }