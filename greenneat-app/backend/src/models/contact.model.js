const { db } = require('../db/db')

const Contact = {
    tableName: 'Contact',
    columns: {
        idContact: 'serial',
        legalRepresentative: 'varchar(100)',
        phone: 'varchar(20)',
    },
    primaryKeys: ['idContact'],
}

module.exports = { Contact }
