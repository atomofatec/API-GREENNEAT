const dotenv = require('dotenv')
dotenv.config()

const db = require('./src/db/db')
const pool = require('./src/db/pool')

const { startServer } = require('./src/configs/server')
const server = startServer()

const { startRoutes } = require('./src/configs/routes')

startRoutes(server)
