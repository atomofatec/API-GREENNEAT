// Modelo tabela fornecimento de oleo pelo Estabelecimento
const Suppliers_Oil = {
    tableName: 'Suppliers_Oil',
    columns: {
        idSuppliers_Oil: 'serial',
        Suppliers_idSupplier: 'int',
        Oil_idOil: 'int',
        quantity: 'decimal(1000,2)',
    },
    primaryKeys: ['idSuppliers_Oil'],
    indexes: ['quantity ASC', 'Suppliers_idSupplier ASC', 'Oil_idOil ASC'],
}

module.exports = { Suppliers_Oil }
