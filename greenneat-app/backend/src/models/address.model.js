const Address = {
    tableName: 'Address',
    columns: {
        idAddress: 'serial',
        address_1: 'varchar(200)',
        address_2: 'varchar(200)',
    },
    primaryKeys: ['idAddress'],
}

module.exports = { Address }
