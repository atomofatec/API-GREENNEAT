const { Pool } = require("pg");

const cliente = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'fatec',
    database: 'greenneat'
});

// Função para realizar a transferencia
async function transfer(senderType, senderId, uniqueKey, transferValue) {
    try {
        // Faz a busca no banco de acordo com os parametros passados
        let sender = await cliente.query(`SELECT * FROM users WHERE id = $1`, [senderId]);
        let receiver = await cliente.query(`SELECT * FROM users WHERE cnpj = $1 OR cpf = $1`, [uniqueKey]);
        // Salva o type_user na variavel pra realizar a logica de negocio
        let receiverType = receiver.rows[0].type_user;

        // Verifica se a busca encontrou sender ou receiver, se nao encontrou printa msg de erro
        if (sender.rows.length === 0 || receiver.rows.length === 0) {
            throw new Error('O remetente ou o destinatário não existe.');
        }
        // Verifique se o remetente tem permissão para transferir
        if ((senderType === 'admin' && receiverType === 'partner') ||
            (senderType === 'partner' && receiverType === 'supplier') ||
            (senderType === 'supplier' && receiverType === 'admin') ||
            (senderType === 'partner' && receiverType === 'admin')) {

            // Inicie uma transação
            await cliente.query('BEGIN');

            // 1. Puxar o balance do 'sender'
            let senderBalanceQueryResp = await cliente.query(`SELECT balance FROM users WHERE id = $1`, [senderId]);
            
            const senderBalance = senderBalanceQueryResp.rows[0].balance;

            // 2. Verificar se o balance é maior que 'transferValue'
            if (senderBalance < transferValue) {
                throw new Error('A transferência não é permitida. Saldo insuficiente');
            }

            // 3. Atualizar o balance - transferValue
            const newSenderBalance = parseInt(senderBalance) - parseInt(transferValue);
            await cliente.query(`UPDATE users SET balance = $1 WHERE id = $2`, [newSenderBalance, senderId]);

            // 4. Atualiza o balance do receiver somando o valor de transferValue
            await cliente.query(`UPDATE users SET balance = balance + $1 WHERE cnpj = $2 OR cpf = $2`, [transferValue, uniqueKey]);

            // Comita a transação
            await cliente.query('COMMIT');
            console.log('Transferência concluída com sucesso.');

        } else {
            throw new Error('A transferência não é permitida para os tipos de remetente e destinatário fornecidos.');
        }
    } catch (error) {

        // Em caso de erro, faça um rollback na transação
        console.error('Erro durante a transferência:', error.message);
        await cliente.query('ROLLBACK');
    } 
}
module.exports = { transfer }
