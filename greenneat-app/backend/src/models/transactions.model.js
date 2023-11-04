const sql = require('./db.js')
const User = require('../models/user.model.js')
const OilSupplier = require('../models/oilSupplier.model.js')

const Transaction = function(transaction) {
    this.id = transaction.id;
    this.date = transaction.date;
    this.type = transaction.type;
    this.amount = transaction.amount;
    this.status = transaction.status;
    this.idSenderUser = transaction.idSenderUser;
    this.idReceiverUser = transaction.idReceiverUser;
}

Transaction.create = async (transaction) => {
    const result = await sql.query(`INSERT INTO transactions (date, amount, status, idSenderUser, idReceiverUser)
                                    VALUES ($1, $2, $3, $4, $5 )`, 
                                    [transaction.date, transaction.amount, transaction.status, transaction.idSenderUser, transaction.idReceiverUser ])
    return result.rows
}

Transaction.findById = async (id) => {
    const result = await sql.query(`SELECT * FROM transactions WHERE id = $1`, [id])
    return result.rows
}

Transaction.findByUserId = async (id) => {
    const result = await sql.query(`SELECT * FROM transactions WHERE idSenderUser = $1 OR idReceiverUser = $1`, [id])
    return result.rows
}

Transaction.approve = async (transaction, user) => {

    try{
        await sql.query('BEGIN')
        await sql.query(`UPDATE transactions SET status = 'APROVADO' WHERE id = $1`, [transaction.id])
        await User.updateBalance(user)
        await sql.query('COMMIT')
    } catch(error){
        await sql.query('ROLLBACK')
        throw error
    }

}

Transaction.findTransferRequest = async (user, amount) => {
    
    const result = await sql.query(`SELECT * FROM transactions WHERE idReceiverUser = $1 AND amount = ($2) AND status = 'SOLICITADO'`, [user.id, amount])
    return result.rows
}

Transaction.transfer = async (transaction, sender, receiver = null) => {
    try{
        await sql.query('BEGIN')
        await Transaction.create(transaction)
        await User.updateBalance(sender)
        if (receiver) await User.updateBalance(receiver)
        await sql.query('COMMIT')
 
    } catch(error){
        await sql.query('ROLLBACK')
        throw error
    }
}

module.exports = Transaction;