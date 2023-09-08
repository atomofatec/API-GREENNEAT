const express = require('express')
const cors = require('cors')

const corsOptions = {
    origin: true,
    credentrials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    allowedHeaders: [
        'Origin',
        'X-Request-With',
        'Content-Type',
        'Accept',
        'Authorization',
    ],
}

function startServer() {
    const server = express()
    const port = 3003

    server.use(express.urlencoded({ extended: false }))
    server.use(express.json())

    server.options('*', cors(corsOptions))
    server.use(cors(corsOptions))

    server.listen(port, () => {
        console.log('Iniciado com sucesso!')
    })

    return server
}

module.exports = { startServer }
