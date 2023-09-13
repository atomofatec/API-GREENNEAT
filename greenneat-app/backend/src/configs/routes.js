const express = require('express')
const app = express()
const cors = require('cors')
const { pool } = require('../db/pool')
const { router: addressRouter, url: addressURL } = require('../routes/routes')

function startRoutes(server) {
    server.use(`/${addressURL}`, addressRouter)

    console.log('Rotas iniciadas com sucesso!')
    return true
}

module.exports = { startRoutes }

//arquivo de config de rotas
