const User = {
    tableName: 'User',
    columns: {
        idUser: 'serial',
        email: 'varchar(50)',
        password: 'varchar(2000)',
        createdAt: 'timestamp',
        updatedAt: 'timestamp',
        Contact_idContact: 'int',
        Address_idAaddress: 'int',
        Natural_idCpf: 'varchar(11)',
        Legal_idCnpj: 'varchar(14)',
        Partner_idPartner: 'int',
        Suppliers_idSupplier: 'int',
    },
    primaryKeys: ['idUser'],
    uniqueKeys: ['email'],
    indexes: [
        'email ASC',
        'createdAt ASC',
        'updatedAt ASC',
        'Legal_idCnpj ASC',
        'Suppliers_idSupplier ASC',
        'Natural_idCpf ASC',
        'Partner_idPartner ASC',
    ],
}

module.exports = { User }

