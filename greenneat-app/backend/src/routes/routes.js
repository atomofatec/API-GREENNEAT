//mid: funcionalidade q ocorrem antes das rotas

const express = require('express')
const create = require('../controllers/address/create.controller')
const update = require('../controllers/address/update.controller')

const url = 'addresses'
const router = express.Router()

router.post('/', create)
router.put('/:id', update)
//find
//remove

module.exports = { url, router }
