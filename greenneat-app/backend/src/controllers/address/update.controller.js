const Address = require('../../models/address.model');

async function update(req, res) {
    try {
        const { idaaddress, address_1, address_2 } = req.body;

        if (!idaaddress) {
            return res.status(400).send({
                error: true,
                mensagem: 'O ID do endereço é obrigatório para atualização.',
            });
        }

        const address = new Address(address_1, address_2);
        address.setId(idaaddress);

        await address.update();

        return res.status(200).send({
            success: true,
            mensagem: 'Endereço atualizado com sucesso.',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error: true,
            mensagem: 'Erro ao atualizar o endereço.',
        });
    }
}

module.exports = update
