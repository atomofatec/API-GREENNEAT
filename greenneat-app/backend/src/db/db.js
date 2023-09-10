const { Pool } = require('pg')

// Função para testar a conexão com o banco de dados
async function testDatabaseConnection() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    })

    try {
        const client = await pool.connect()
        console.log('Conexão com o banco de dados bem-sucedida')
        client.release()
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error.message)
    } finally {
        pool.end()
    }
}

testDatabaseConnection()

module.exports = { testDatabaseConnection }
