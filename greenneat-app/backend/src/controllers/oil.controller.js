const Oil = require('../models/oil.model.js')
const OilSupplier = require('../models/oilSupplier.model.js')
const GREENEAT_USER = 1
const PARTNER_USER = 3
const SUPPLIER_USER = 2

exports.create = async (req, res) => {
    
    try{

        const user = req.user

        if (!user.idusertype == GREENEAT_USER){
            res.status(403).send()
            return
        }

        const oil = new Oil({
            type: req.body.type,
            description: req.body.description
        })

        await Oil.create(oil)
        res.status(201).send()
        

    } catch (error) { 

        console.log(error)
        res.status(500).send("Erro ao processar requisição!")

    }
}

exports.findAll = async (req, res) => {
    
    try{

        res.status(200).send(await Oil.findAll())

    } catch (error) { 

        console.log(error)
        res.status(500).send("Erro ao processar requisição!")

    }
}

exports.request = async (req, res) => {

    try{

        const user = req.user

        if (!user.idusertype == SUPPLIER_USER){
            res.status(403).send()
            return
        }

        const oilSupplier = new OilSupplier({
            idOil: req.body.idOil,
            quantity: req.body.quantity,
            price: req.body.price,
            date: new Date(),
            status: "DISPONIVEL",
            idUserSupplier: user.id
        })

        await OilSupplier.create(oilSupplier)

        res.status(200).send()
        

    } catch (error) { 

        console.log(error)
        res.status(500).send("Erro ao processar requisição!")

    }
}

exports.findAvailables = async (req, res) => {
    
    try{

        const result = await OilSupplier.findAvailables()
        res.status(200).send(result)

    } catch (error) { 
        
        console.log(error)
        res.status(500).send("Erro ao processar requisição!")

    }
}

exports.compare = async (req, res) => {
    
    try{
        const user = req.user

        if (!user.idusertype == GREENEAT_USER){
            res.status(403).send()
            return
        }

        const locationId = parseInt(req.query.location)
        const oilType = parseInt(req.query.type)
    
        const result = await OilSupplier.compare(oilType, locationId)
        
        const response = result[0].avg == null ? {averagePrice: 0} : {averagePrice: parseFloat(result[0].avg).toFixed(2)}
        res.status(200).send(response)

    } catch (error) {
        
        console.log(error)
        res.status(500).send("Erro ao processar requisição!")

    }
}
