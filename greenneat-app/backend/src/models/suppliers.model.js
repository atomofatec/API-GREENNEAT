//Modelo tabela Estabelecimento
const Suppliers = {
    tableName: 'Suppliers',
    columns: {
        idSupplier: 'serial',
        suppliersName: 'varchar(200)',
    },
    primaryKeys: ['idSupplier'],
    indexes: ['suppliersName ASC'],
}

module.exports = { Suppliers }
