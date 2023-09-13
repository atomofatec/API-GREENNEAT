const { db } = require('../db/db')

class Address {
    tableName = 'Address'
    tableColumns = {
        idaaddress: 'serial',
        address_1: 'varchar(200)',
        address_2: 'varchar(200)',
    }
    tablePrimaryKeys = ['idaaddress']

    constructor(address_1, address_2) {
        this.address_1 = address_1
        this.address_2 = address_2
    }

    // Método para definir o ID do endereço
    setId(id) {
        this.idaaddress = id
    }

    // Método para salvar ou atualizar o endereço
    async save() {
        if (this.idaaddress) {
            // Se o ID do endereço já estiver definido, execute uma atualização
            await this.update()
        } else {
            // Caso contrário, crie um novo endereço
            await this.create()
        }
    }

    async create() {
        const session = await db.connect()
        const result = await session.one(this.createSql(), [], (data) => {
            this.setId(data.idaaddress)
            return data.idaaddress
        })
        session.done()
        console.log(result) // Resolver: retorna o ID do endereço criado
        return result
    }

    createSql() {
        return `INSERT INTO ${this.tableName} (address_1, address_2)
    VALUES ('${this.address_1}', '${this.address_2}') RETURNING idaaddress`
    }

    async update() {
        if (!this.idaaddress) {
            throw new Error(
                'O ID do endereço deve estar definido para atualização.'
            )
        }

        const session = await db.connect()
        const result = await session.none(this.updateSql(), [])
        session.done()
        console.log(result) // Resolver: saída de log da atualização
        return result
    }

    updateSql() {
        return `UPDATE ${this.tableName} SET address_1 = '${this.address_1}',
    address_2 = '${this.address_2}' WHERE idaaddress = ${this.idaaddress}`
    }
}

module.exports = Address

/*const { db } = require('../db/db')

class Address {
    tableName = 'Address'
    tableColumns = {
        idaaddress: 'serial',
        address_1: 'varchar(200)',
        address_2: 'varchar(200)',
    }
    tablePrimaryKeys = ['idaaddress']

    constructor(address_1, address_2) {
        this.address_1 = address_1
        this.address_2 = address_2
    }

    async create() {
        const session = await db.connect()
        const result = await session.one(
            this.createSql(),
            [],
            (data) => data.id
        )
        session.done()
        console.log(result) //resolver: retorna undefined
        return result
    }
    createSql() {
        return `INSERT INTO ${this.tableName} (address_1, address_2)
    VALUES ('${this.address_1}', '${this.address_2}') RETURNING idaaddress`
    } //retorna o sql

    update() {
        return `UPDATE ${this.tableName} SET address_1 = '${this.address_1}',
    address_2 = '${this.address_2}' WHERE idaaddress = ${this.idaaddress}`
    }

    
    
}
//set

module.exports = Address
*/
