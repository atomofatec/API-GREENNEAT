const express = require('express');
const { router: userRouter, url: userURL } = require('../routes/user.routes');


function startRoutes(server) {
   // server.use(`/${userURL}`, userRouter);

    console.log('Rotes iniciadas com sucesso!')
    return true;
}

module.exports = { startRoutes };
