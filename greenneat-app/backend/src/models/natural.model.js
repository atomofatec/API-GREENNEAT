const { db } = require('../db/db')
//tabela pessoa fisica
const Natural = {
    tableName: 'Natural',
    columns: {
        idCpf: 'varchar(11)',
        rg: 'varchar(20)',
        USER_ID_user: 'int',
    },
    primaryKeys: ['idCpf'],
}

module.exports = { Natural }
