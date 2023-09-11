const { db } = require('../db/db')
//tabela regiao de atuacao dos Estabelecimentos fornecedores de oleo
const Suppliers_BusinessArea = {
    tableName: 'Suppliers_BusinessArea',
    columns: {
        idSuppliers_BusinessArea: 'serial',
        Suppliers_idSupplier: 'int',
        BusinessArea_idArea: 'int',
    },
    primaryKeys: ['idSuppliers_BusinessArea'],
    indexes: ['Suppliers_idSupplier ASC', 'BusinessArea_idArea ASC'],
}

module.exports = { Suppliers_BusinessArea }
