const pgp = require('pg-promise')()

const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DATABASE,
} = process.env

const dbConfig = {
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    database: POSTGRES_DATABASE,
}

const db = pgp(dbConfig)

db.connect()
    .then((obj) => {
        console.log('Conexão com o banco de dados bem-sucedida.')

        return obj
            .one('SELECT 1')
            .then((data) => {
                console.log('Consulta de teste bem-sucedida:', data)
            })
            .catch((error) => {
                console.error('Erro na consulta de teste:', error)
            })
            .finally(() => {
                obj.done()
            })
    })
    .catch((error) => {
        console.error('Erro na conexão com o banco de dados:', error)
    })

module.exports = { db }

