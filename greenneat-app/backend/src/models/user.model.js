const sql = require('./db.js')

const User = function(user) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.balance = user.balance;
    this.createdAt = user.createdAt;
    this.idUserType = user.idUserType;
}

User.findAll = async () => {
    const result = await sql.query(`SELECT users.id, users.email, users.balance, users.idusertype, userdetails.name, userdetails.telephone,
                                           userdetails.document, userdetails.address, userdetails.businessname
                                    FROM users 
                                    LEFT JOIN userdetails ON users.id = userdetails.idUser`)
    return result.rows
}

User.findById = async (id) => {
    
    const result = await sql.query(`SELECT users.id, users.email, users.balance, users.idusertype, userdetails.name, userdetails.telephone,
                                           userdetails.document, userdetails.address, userdetails.businessname
                                    FROM users 
                                    LEFT JOIN userdetails ON users.id = userdetails.idUser 
                                    WHERE users.id = ($1) `, [id])
    return result.rows
}

User.findByEmail = async (email) => {
    const result = await sql.query(`SELECT id, password
                                    FROM users
                                    WHERE email = ($1) `, [email])
    return result.rows
}

User.findByDocument = async (document) => {
    const result = await sql.query(`SELECT users.id, users.email, users.balance, users.idusertype, userdetails.name, userdetails.telephone,
                                           userdetails.document, userdetails.address, userdetails.businessname
                                    FROM users 
                                    LEFT JOIN userdetails ON users.id = userdetails.idUser 
                                    WHERE userdetails.document = ($1) `, [document])
    return result.rows
}

User.updateById = async (user, userDetail) => {
    try {
        await sql.query('BEGIN');

        const userUpdate = await sql.query('UPDATE users SET email = $1 WHERE id = $2', [user.email, user.id]);

        const userDetailsUpdate = await sql.query('UPDATE userdetails SET name = $1, telephone = $2, document = $3, address = $4, businessName = $5 WHERE idUser = $6', 
        [userDetail.name, userDetail.telephone, userDetail.document, userDetail.address, userDetail.businessName, user.id]);

        await sql.query('COMMIT');

        return { userUpdate, userDetailsUpdate };
    } catch (error) {
        await sql.query('ROLLBACK');
        throw error;
    }
}

User.create = async (user, userDetail, location) => {
    
    try{
        
        await sql.query('BEGIN')

        const newUser = await sql.query(`INSERT INTO users (email, password, balance, createdAt, updatedAt, idUserType)
                                         values ($1, $2, $3, $4, $5, $6) RETURNING id`,
                                        [user.email, user.password, 0, new Date(), new Date(), user.idUserType])

        await sql.query(`INSERT INTO userdetails (name, telephone, document, address, businessName, idUser) 
                         values ($1, $2, $3, $4, $5, $6)`,
                        [ userDetail.name, userDetail.telephone, userDetail.document, userDetail.address, userDetail.businessName, newUser.rows[0].id ])

        if (location)
            await sql.query(`INSERT INTO suppliers_locations (idLocations, idUserSupplier) VALUES ($1, $2)`, [location, newUser.rows[0].id])

        await sql.query('COMMIT')

    } catch(error){
        
        await sql.query('ROLLBACK')
        throw error

    }
}

User.delete = async (id) => {
    
    try{
        await sql.query('BEGIN')
        await sql.query('DELETE FROM userdetails WHERE idUser = $1', [id])
        await sql.query('DELETE FROM users WHERE id = $1', [id])
        await sql.query('COMMIT')
    }catch(error){
        await sql.query('ROLLBACK')
        throw error
    }
}

User.updateBalance = async (user) => {

    await sql.query('UPDATE users SET balance = $1, updatedat = $2 WHERE id = $3', [user.balance, new Date(), user.id])

}

User.findGreeneatUser = async () => {
    const result = await sql.query(`SELECT *
                                    FROM users
                                    WHERE idUserType = ($1) `, [1])
    return result.rows
}

module.exports = User;