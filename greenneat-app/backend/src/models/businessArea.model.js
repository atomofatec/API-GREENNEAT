//modelo tabela regiao
const BusinessArea = {
    tableName: 'BusinessArea',
    columns: {
        idArea: 'serial',
        nameArea: 'varchar(100)',
    },
    primaryKeys: ['idArea'],
    indexes: ['nameArea ASC'],
}

module.exports = { BusinessArea }
