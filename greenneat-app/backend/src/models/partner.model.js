// Modelo tabela Parceiro
const Partner = {
    tableName: 'Partner',
    columns: {
        idPartner: 'serial',
        partnerName: 'varchar(200)',
    },
    primaryKeys: ['idPartner'],
    indexes: ['partnerName ASC'],
}

module.exports = { Partner }
