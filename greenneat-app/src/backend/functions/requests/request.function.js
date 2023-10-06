const { Pool } = require("pg");

const cliente = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'fatec',
    database: 'greenneat'
});

async function request(req, res){
    const {supplier_cnpj, type_oil, amount, status} = req.body;
    console.log(req.body);

    try{
        const SQL = `
            INSERT INTO
            requests("supplier_cnpj", "type_oil", "amount", "status")
            VALUES('${supplier_cnpj}','${type_oil}','${amount},'${status}')`

        const resultado = await cliente.query(SQL);
        console.log("SOlicitação registrada com sucesso!");
        res.send({msg: "Solicitação registrada com sucesso!"});
    } catch (erro){
        console.log("Erro ao registrar a solicitação: ", error);
        res.status(500).send({msg: "Erro ao solicitar."});
    }
}

module.exports = {request}