const Address = require('../../models/address.model')

async function create(req, res) {
    try {
        const { address_1, address_2 } = req.body

        const address = new Address(address_1, address_2)

        const addressCreated = await address.create({ address_1, address_2 })

        return res.sendStatus(201).send(addressCreated)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500).send({
            error: true,
            mensagem: ' Endereço não foi criado!',
        })
    }
}


module.exports = create 
