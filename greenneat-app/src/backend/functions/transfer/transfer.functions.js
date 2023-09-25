const { Pool } = require("pg");

const cliente = new Pool({
  host: "localhost",
  user: "postgres",
  password: "simone",
  database: "007",
});

async function transfer(senderId, uniqueKey, transferValue) {
  try {
    console.log(typeof uniqueKey, typeof transferValue, typeof senderId);
    console.log(
      "uniquekey:" +
        uniqueKey +
        " transferValue:" +
        transferValue +
        " senderId:" +
        senderId
    );

    // Faz a busca no banco de acordo com os parametros passados
    let sender = await cliente.query(
      `SELECT * FROM Users WHERE id = '${senderId}'`
    );
    let receiver = await cliente.query(
      `SELECT * FROM UserDetails WHERE document = '${uniqueKey}'`
    );

    let receiverType = await cliente.query(
      `SELECT U.idUserType FROM Users U JOIN UserDetails UD ON U.id = UD.idUser WHERE UD.document = '${uniqueKey}'`
    );

    receiverType = receiverType.rows[0].idusertype;

    console.log(receiverType);

    // Verifica se a busca encontrou sender ou receiver, se nao encontrou printa msg de erro
    if (sender.rows.length === 0 || receiver.rows.length === 0) {
      throw new Error("O remetente ou o destinatário não existe.");
    }
    // Verifique se o remetente tem permissão para transferir
    //admin = 1; supplier = 2; partner = 3
    if (
      (senderId === 1 && receiverType === 3) ||
      (senderId === 3 && receiverType === 2) ||
      (senderId === 2 && receiverType === 1)
    ) {
      // Inicie uma transação
      await cliente.query("BEGIN");

      // 1. Puxar o balance do 'sender'
      let senderBalanceQueryResp = await cliente.query(
        `SELECT balance FROM Users WHERE id ='${senderId}'`
      );

      const senderBalance = senderBalanceQueryResp.rows[0].balance;

      console.log(senderBalance);

      // 2. Verificar se o balance é maior que 'transferValue'
      if (senderBalance < transferValue) {
        throw new Error("A transferência não é permitida. Saldo insuficiente");
      }

      console.log(senderBalance);
      console.log(transferValue);

      // 3. Atualizar o balance - transferValue
      const newSenderBalance =
        parseInt(senderBalance) - parseInt(transferValue);
      await cliente.query(
        `UPDATE Users SET balance = '${newSenderBalance}' WHERE id = '${senderId}'`
      );

      // 4. Atualiza o balance do receiver somando o valor de transferValue
      await cliente.query(
        `UPDATE Users SET balance = balance + '${transferValue}' 
        FROM UserDetails 
        WHERE document = '${uniqueKey}' 
        AND Users.id = UserDetails.idUser`
      );


      // Comita a transação
      await cliente.query("COMMIT");
      console.log("Transferência concluída com sucesso.");
    } else {
      throw new Error(
        "A transferência não é permitida para os tipos de remetente e destinatário fornecidos."
      );
    }
  } catch (error) {
    // Em caso de erro, faça um rollback na transação
    console.error("Erro durante a transferência:", error.message);
    await cliente.query("ROLLBACK");
  }
}

module.exports = { transfer };
