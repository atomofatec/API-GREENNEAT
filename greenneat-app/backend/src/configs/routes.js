const express = require('express')
const { router: userRouter, url: userURL } = require('../routes/address.routes')

function startRoutes(server) {
   // server.use(`/${userURL}`, userRouter)

    console.log('Rotas iniciadas com sucesso!')
    return true
}

module.exports = { startRoutes }
