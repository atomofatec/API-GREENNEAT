const Metrics = require('../models/metrics.model.js')
const GREENEAT_USER = 1

exports.usersByRegion = async (req, res) => {
    
    try{

        const user = req.user

        if (!user.idusertype == GREENEAT_USER){
            res.status(403).send()
            return
        }

        res.status(200).send(await Metrics.usersByRegion())

    } catch (error) { 

        console.log(error)
        res.status(500).send("Erro ao processar requisição!")

    }
}

exports.topSuppliers = async (req, res) => {
    
    try{

        const user = req.user

        if (!user.idusertype == GREENEAT_USER){
            res.status(403).send()
            return
        }

        res.status(200).send(await Metrics.topsuppliers())

    } catch (error) { 

        console.log(error)
        res.status(500).send("Erro ao processar requisição!")

    }
}

exports.topRegions = async (req, res) => {
    
    try{

        const user = req.user

        if (!user.idusertype == GREENEAT_USER){
            res.status(403).send()
            return
        }

        res.status(200).send(await Metrics.topregions())

    } catch (error) { 

        console.log(error)
        res.status(500).send("Erro ao processar requisição!")

    }
}

exports.topTransactionsPartner = async (req, res) => {
    
    try{

        const user = req.user

        if (!user.idusertype == GREENEAT_USER){
            res.status(403).send()
            return
        }

        res.status(200).send(await Metrics.topTransactionsPartner())

    } catch (error) { 

        console.log(error)
        res.status(500).send("Erro ao processar requisição!")

    }
}

exports.topTransactionsSupplier = async (req, res) => {
    
    try{

        const user = req.user

        if (!user.idusertype == GREENEAT_USER){
            res.status(403).send()
            return
        }

        res.status(200).send(await Metrics.topTransactionsSupplier())

    } catch (error) { 

        console.log(error)
        res.status(500).send("Erro ao processar requisição!")

    }
}