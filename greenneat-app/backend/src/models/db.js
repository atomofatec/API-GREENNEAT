require('dotenv').config()
const { Pool } = require('pg')

const connection = new Pool({
    //connectionString: process.env.POSTGRES_URL
   //POSTGRES_URL = postgres://djyufnoa:NgPxKVGzmQOzA0Q-wTYWrs4QItqnfytQ@silly.db.elephantsql.com/djyufnoa

    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
})

module.exports = connection;