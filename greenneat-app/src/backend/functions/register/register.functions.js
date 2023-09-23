const { Pool } = require("pg");

const cliente = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'fatec',
    database: 'greenneat'
});

async function existentCNPJRegister(cnpj){
    const res = await cliente.query(
        `SELECT * FROM users WHERE cnpj = '${cnpj}'`);

        var response = false
        res.rows.forEach( register => {
            if (register.cnpj === !null && register.cnpj === cnpj ) {
                console.log("Já existe um cadastro no CNPJ informado. Por favor digite outro CNPJ.");
                response = true;
            }
        });
        return response;
}

async function existentCPFRegister(cpf){
    const res = await cliente.query(
        `SELECT * FROM users WHERE cpf = '${cpf}'`);

        var response = false
        res.rows.forEach( register => {
            if (register.cpf === !null && register.cpf === cpf ) {
                console.log("Já existe um cadastro no CPF informado. Por favor digite outro CPF.");
                response = true;
            }
        });
        return response;
}

async function existentEmailRegister(email){
    const res = await cliente.query(
        `SELECT * FROM users WHERE email = '${email}'`);

        var response = false
        res.rows.forEach( register => {
            if (register.email === email) {
                console.log("Já existe um cadastro no email informado. Por favor digite outro email.");
                response = true;
            }
        });
        return response;
}

async function registerFunction(req, res){
    const {type, cnpj, cpf, email, password, telefone, bairro, endereco, numero, rSocial, nFantasia, balance, createdat, updatedat} = req.body;
    console.log(req.body)

    const existentCnpj = await existentCNPJRegister(cnpj);
    const existentEmail = await existentEmailRegister(email);
    const existentCpf = await existentCPFRegister(cpf);

    if (existentCnpj) {
        res.status(409).send({ msg: "Já existe um registro no CNPJ informado." });
    }

    if (existentCpf) {
        res.status(409).send({ msg: "Já existe um registro no CPF informado." });
    }

    if (existentEmail) {
        res.status(409).send({ msg: "Já existe um registro no email informado." });
    } else {
        try {
            const SQL = `
                INSERT INTO
                users("type_user","cnpj", "cpf", "email","password","contact", "district","address","num_address","company_name", "fantasy_name", "balance", "createdat", "updatedat")
                VALUES ('${type}','${cnpj}','${cpf}','${email}','${password}','${telefone}', '${bairro}','${endereco}','${numero}', '${rSocial}',' ${nFantasia}', '${balance}', '${createdat}', '${updatedat}')`
            const resultado = await cliente.query(SQL);
            console.log("Cadastro realizado com sucesso!");
            res.send({ msg: "Cadastro realizado com sucesso!" });
        } catch (error) {
            console.error("Erro ao cadastrar estabelecimento:", error);
            res.status(500).send({ msg: "Erro ao cadastrar." });
        }
    }
}

module.exports = { registerFunction }