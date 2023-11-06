const sql = require('./db.js')

const Metrics = function(metrics) {
    this.id = metrics.id;
}

Metrics.usersByRegion = async () => {
    const result = await sql.query(`SELECT locations.namearea, COUNT(*) FROM suppliers_locations sl
                                    RIGHT JOIN locations ON sl.idLocations = locations.id
                                    GROUP BY locations.namearea`)
    return result.rows
}

Metrics.topsuppliers = async () => {
    const result = await sql.query(`SELECT ud.businessName, SUM(so.quantity) FROM suppliers_oil so
                                    JOIN userdetails ud ON ud.idUser = so.idusersupplier
                                    GROUP BY ud.businessName
                                    ORDER BY SUM(so.quantity)`)
    return result.rows
}

Metrics.topregions = async () => {
    const result = await sql.query(`SELECT l.namearea, COUNT(so.*) FROM suppliers_oil so
                                    JOIN suppliers_locations sl ON sl.idUserSupplier = so.idUserSupplier
                                    RIGHT JOIN locations l ON l.id = sl.idLocations
                                    GROUP BY l.namearea`)
    return result.rows
}

Metrics.topTransactionsPartner = async () => {
    const result = await sql.query(`SELECT ud.businessname, COUNT(*) FROM suppliers_oil so
                                    JOIN userDetails ud ON ud.idUser = so.idUserPartner
                                    WHERE idUserPartner IS NOT NULL
                                    GROUP BY ud.businessname`)
    return result.rows
}

Metrics.topTransactionsSupplier = async () => {
    const result = await sql.query(`SELECT ud.businessname, COUNT(*) FROM suppliers_oil so
                                    JOIN userDetails ud ON ud.idUser = so.idUserSupplier
                                    WHERE idUserSupplier IS NOT NULL
                                    GROUP BY ud.businessname`)
    return result.rows
}

module.exports = Metrics;