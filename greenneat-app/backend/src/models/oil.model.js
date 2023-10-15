const sql = require('./db.js')

const Oil = function(oil) {
    this.id = oil.id;
    this.type = oil.type;
    this.description = oil.description;
}

Oil.create = async (oil) => {
    const result = await sql.query(`INSERT INTO Oils (type, description)
                                    VALUES ($1, $2)`, 
                                    [oil.type, oil.description])
    return result.rows
}

Oil.findAll = async () => {
    const result = await sql.query(`SELECT * FROM Oils`)
    return result.rows
}


module.exports = Oil;