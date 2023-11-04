const sql = require('./db.js')
 
const OilSupplier = function(oilSupplier) {
    this.id = oilSupplier.id;
    this.idOil = oilSupplier.idOil;
    this.quantity = oilSupplier.quantity;
    this.availableDate = oilSupplier.availableDate;
    this.idUserSupplier = oilSupplier.idUserSupplier;
    this.status = oilSupplier.status;
    this.price = oilSupplier.price;
}
 
OilSupplier.create = async (oilSupplier) => {
    const result = await sql.query(`INSERT INTO suppliers_oil (idOil, quantity, availableDate, idUserSupplier, status, price)
                                    VALUES ($1, $2, $3, $4, $5, $6)`, 
                                    [oilSupplier.idOil, oilSupplier.quantity, oilSupplier.availableDate, oilSupplier.idUserSupplier, oilSupplier.status, oilSupplier.price])
    return result.rows
}
 
OilSupplier.findById = async (id) => {
    const result = await sql.query(`SELECT * FROM suppliers_oil WHERE id = $1`, [id])
    return result.rows
}
 
OilSupplier.findAvailables = async () => {
    const result = await sql.query(`SELECT suppliers_oil.*, userDetails.businessName, userDetails.document FROM suppliers_oil 
                                    JOIN users ON suppliers_oil.idUserSupplier = users.id
                                    JOIN userDetails ON users.id = userDetails.idUser
                                    WHERE suppliers_oil.status='DISPONIVEL'`)
    return result.rows
}
 
OilSupplier.findCollected = async (id) => {
    const result = await sql.query(`SELECT suppliers_oil.*, userDetails.businessName, userDetails.document FROM suppliers_oil 
                                    JOIN users ON suppliers_oil.idUserSupplier = users.id
                                    JOIN userDetails ON users.id = userDetails.idUser
                                    WHERE suppliers_oil.status='COLETADO' 
                                    AND idUserPartner = $1`, [id])
    return result.rows
}
 
OilSupplier.updateStatus = async (oilSupplierId, partnerId, status) => {
 
    try{

        await sql.query('BEGIN')
        await sql.query(`UPDATE suppliers_oil SET status = $1, idUserPartner = $2 where id = $3`, [status, partnerId, oilSupplierId])
 
        if (status == "COLETADO")
            await sql.query(`UPDATE suppliers_oil SET collectionDate = $1 where id = $2`, [new Date(), oilSupplierId])
        else if (status == "ENTREGUE")
            await sql.query(`UPDATE suppliers_oil SET deliveryDate = $1 where id = $2`, [new Date(), oilSupplierId])
 
        await sql.query('COMMIT')
 
    } catch(error){
        await sql.query('ROLLBACK')
        throw error
    }
}
 
OilSupplier.reverteStatus = async (id) => {
 
    try{

        await sql.query(`UPDATE suppliers_oil SET status = $1, idUserPartner = $2, collectionDate = $3 where id = $4`,
                        ["DISPONIVEL", null, null, id])
 
    } catch(error){
        throw error
    }
 
}
 
OilSupplier.compare = async (oilType, locationId) => {

    const result = await sql.query(`SELECT AVG(so.price / so.quantity) FROM SUPPLIERS_OIL so
                                    JOIN users u ON u.id = so.idUserSupplier
                                    JOIN suppliers_locations sl ON sl.idUserSupplier = u.id
                                    WHERE so.idOil = $1 AND sl.idLocations = $2`, [oilType, locationId])
    return result.rows
}
 
OilSupplier.findAll = async () => {
    const result = await sql.query(`SELECT * FROM Suppliers_Oil`)
    return result.rows
}
 
OilSupplier.findGreeneat = async () => {
    const result = await sql.query(`SELECT so.deliveryDate, ud.document, ud.name nomeestabelecimento, so.price, o.type, so.quantity, ud2.name nomeparceiro
                                    FROM suppliers_oil so 
                                    JOIN oils o on so.idOil = o.id
                                    JOIN userDetails ud on ud.idUser = so.idUserSupplier 
                                    JOIN userDetails ud2 on ud2.idUser = so.idUserPartner`)
    return result.rows
}
//collectDate
module.exports = OilSupplier;