const Oil = {
    tableName: 'Oil',
    columns: {
        idOil: 'serial',
        type: 'varchar(50)',
        price: 'decimal(10,2)',
        description: 'varchar(200)',
    },
    primaryKeys: ['idOil'],
    indexes: ['type ASC', 'price ASC'],
}

module.exports = { Oil }
