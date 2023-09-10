//para gerenciamento de conexoes
const { Pool } = require('pg')

const poolConfig = {
    connectionString: process.env.DATABASE_URL,
    max: 20, // Número máximo de conexões no pool
    idleTimeoutMillis: 30000, // Tempo limite para conexões inativas (30 segundos)
}

const pool = new Pool(poolConfig)

module.exports = { pool }

/*Use o pg-pool quando precisar gerenciar várias conexões em pedidos simultâneos. 
O pool de conexões será útil para garantir que você não exceda o número máximo de conexões permitidas 
e para reutilizar conexões existentes */
