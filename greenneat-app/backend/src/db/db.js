const pgp = require('pg-promise')()

const dbConfig = {
    connectionString: process.env.DATABASE_URL,
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
