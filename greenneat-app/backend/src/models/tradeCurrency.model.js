const { db } = require('../db/db')
//tabela Transacao financeira
const TradeCurrency = {
    tableName: 'TradeCurrency',
    columns: {
        idTrade: 'serial',
        createdAt: 'timestamp',
        type: 'varchar(200)',
        debitAmount: 'decimal(100,2)',
        creditAmount: 'decimal(100,2)',
        status: 'varchar(200)',
        Suppliers_idSupplier: 'int',
        Partner_idPartner: 'int',
    },
    primaryKeys: ['idTrade'],
    indexes: [
        'createdAt ASC',
        'Suppliers_idSupplier ASC',
        'Partner_idPartner ASC',
        'type ASC',
        'status ASC',
    ],
}

module.exports = { TradeCurrency }
