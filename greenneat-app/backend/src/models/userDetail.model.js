const sql = require('./db.js')

const UserDetail = function(user) {
    this.id = user.id;
    this.name = user.name;
    this.telephone = user.telephone;
    this.document = user.document;
    this.address = user.address;
    this.businessName = user.businessName;
    this.idUser = user.idUser;
}


UserDetail.findByUserId = async (id) => {
    const result = await sql.query("SELECT * FROM usersdetails WHERE idUser = ($1)", [id])
    return result.rows
}

module.exports = UserDetail;