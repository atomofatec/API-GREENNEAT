const { Pool } = require("pg");

const cliente = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'fatec',
    database: 'greenneat'
});

// função login
function login(email, password, res) {
    // executa consulta SQL e seleciona usuário onde campos 'email' e 'password_user' são iguais aos recebidos
    cliente.query("SELECT * FROM users WHERE email = '" + email + "' AND password = '" + password + "' ;", (err, result) => {
        if (err) {
            // retorna erro
            console.log('erro query:', err);
        }
        // se a linha encontrada for igual a 1 (ou seja, se o usuário existir)...
        if (result.rows.length === 1) {
            // armazena os dados do usuário no objeto 'data' e retorna seu valor, ou retorna erro
            const idUser = result.rows.values().next().value.id;
            const tipoUser = result.rows.values().next().value.type_user;
            const emailUser = result.rows.values().next().value.email;
            const passwordUser = result.rows.values().next().value.password;
            const cpfUser = result.rows.values().next().value.cpf;
            const cnpjUser = result.rows.values().next().value.cnpj;
            const mensagem = 'Usuário logado'
            const data = { msg: mensagem, id: idUser, type_user: tipoUser, email: emailUser, password: passwordUser, cpf: cpfUser, cnpj: cnpjUser }
            res.send(data)
        } else {
            res.send({ msg: "Usuário não cadastrado/Informações estão incorretas" })
        }
    })
}

module.exports = { login }