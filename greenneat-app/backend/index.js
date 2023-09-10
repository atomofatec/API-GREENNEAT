const dotenv = require('dotenv')
dotenv.config() 

const { testDatabaseConnection } = require('./src/db/db')

const { startServer } = require('./src/configs/server')
const server = startServer()
