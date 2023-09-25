const { Pool } = require("pg");

const cliente = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'simone',
    database: '007'
});

// função login
async function login(email, password, res) {
    try {
        // Executa uma consulta SQL parametrizada para evitar injeção de SQL
        const result = await cliente.query({
            text: `
                SELECT u.id, u.idUserType, u.email, u.password, ud.document
                FROM Users AS u
                LEFT JOIN UserDetails AS ud ON u.id = ud.idUser
                WHERE u.email = $1 AND u.password = $2
            `,
            values: [email, password]
        });

        // Verifica se encontrou um usuário correspondente
        if (result.rows.length === 1) {
            const user = result.rows[0];
            const data = {
                msg: 'Usuário logado',
                id: user.id,
                type_user: user.idusertype,
                email: user.email,
                password: user.password,
                document: user.document // Ambos CPF e CNPJ estão na mesma coluna
            };
            res.send(data);
        } else {
            res.send({ msg: "Usuário não cadastrado/Informações estão incorretas" });
        }
    } catch (error) {
        console.error('Erro ao realizar o login:', error);
        res.status(500).send({ msg: 'Erro ao realizar o login' });
    }
}

module.exports = { login };
