// Modelo tabela pessoa juridica
const Legal = {
    tableName: 'Legal',
    columns: {
        idCnpj: 'varchar(14)',
        tradeName: 'varchar(100)',
    },
    primaryKeys: ['idCnpj'],
}

module.exports = { Legal }
