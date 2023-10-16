const sql = require('./db.js')

const OilSupplier = function(oilSupplier) {
    this.id = oilSupplier.id;
    this.idOil = oilSupplier.idOil;
    this.quantity = oilSupplier.quantity;
    this.date = oilSupplier.date;
    this.idUserSupplier = oilSupplier.idUserSupplier;
    this.status = oilSupplier.status;
    this.price = oilSupplier.price;
}

OilSupplier.create = async (oilSupplier) => {
    const result = await sql.query(`INSERT INTO suppliers_oil (idOil, quantity, date, idUserSupplier, status, price)
                                    VALUES ($1, $2, $3, $4, $5, $6)`, 
                                    [oilSupplier.idOil, oilSupplier.quantity, oilSupplier.date, oilSupplier.idUserSupplier, oilSupplier.status, oilSupplier.price])
    return result.rows
}

OilSupplier.findAvailables = async () => {
    const result = await sql.query(`SELECT suppliers_oil.*, userDetails.businessName FROM suppliers_oil 
                                    JOIN users ON suppliers_oil.idUserSupplier = users.id
                                    JOIN userDetails ON users.id = userDetails.idUser
                                    WHERE suppliers_oil.status='DISPONIVEL'`)
    return result.rows
}

OilSupplier.findByIdAndValue = async (id, value) => {
    const result = await sql.query(`SELECT id FROM suppliers_oil WHERE idUserSupplier=$1 AND price=$2`, [id, value])
    return result.rows
}

OilSupplier.updateStatus = async (id) => {
    const result = await sql.query(`UPDATE suppliers_oil SET status = 'COLETADO' where id = $1`, [id])
    return result.rows
}

OilSupplier.compare = async (oilType, locationId) => {
    
    const result = await sql.query(`SELECT AVG(so.price / so.quantity) FROM SUPPLIERS_OIL so
                                    JOIN users u ON u.id = so.idUserSupplier
                                    JOIN suppliers_locations sl ON sl.idUserSupplier = u.id
                                    WHERE so.idOil = $1 AND sl.idLocations = $2`, [oilType, locationId])
    return result.rows
}


module.exports = OilSupplier;