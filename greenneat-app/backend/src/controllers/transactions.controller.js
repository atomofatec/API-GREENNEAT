const Transaction = require('../models/transactions.model.js')
const User = require('../models/user.model.js')
const OilSupplier = require('../models/oilSupplier.model.js')
const GREENEAT_USER = 1
const PARTNER_USER = 3


exports.request = async (req, res) => {
    
    try{

        const user = req.user

        if (!user.idusertype == PARTNER_USER){
            res.status(400).send("Apenas parceiros podem requisitar moedas")
            return
        }

        const greenUser = await User.findGreeneatUser()
        
        const transaction = new Transaction({
            date: new Date(),
            amount: req.body.amount,
            status: "SOLICITADO",
            idSenderUser: greenUser[0].id,
            idReceiverUser: user.id
        })
        

        await Transaction.create(transaction)
        res.status(201).send()
        

    } catch (error) { 

        console.log(error)
        res.status(500).send("Erro ao processar requisição!")

    }
}

exports.findByUserId = async (req, res) => {

    try{
        const result = await Transaction.findByUserId(req.user.id)
        res.send(result)

    } catch (error) { 

        console.log(error)
        res.status(500).send("Erro ao processar requisição!")
    }

}

exports.transfer = async (req, res) => {
    try {
      const document = req.body.document;
      const amount = req.body.amount;
  
      let receiver = await User.findByDocument(document);
      let sender = await User.findById(req.user.id);
  
      receiver = receiver[0];
      sender = sender[0];
  
      if (sender.idusertype == GREENEAT_USER) {
        const transaction = await Transaction.findTransferRequest(
          receiver,
          amount
        );
  
        if (!transaction.length) {
          res.status(400).send({
            message: "Nenhuma solicitação aberta foi encontrada para o usuário!",
          });
          return;
        }
        receiver.balance += transaction[0].amount;
        await Transaction.approve(transaction[0], receiver);
        res.send("Transferencia aprovada");
        return;
      }
  
      if (sender.balance < amount) {
        res.status(400).send({ message: "Saldo insuficiente!" });
        return;
      }
  
      const transaction = new Transaction({
        date: new Date(),
        amount: amount,
        status: "REALIZADO",
        idSenderUser: sender.id,
        idReceiverUser: receiver.id,
      });
  
      sender.balance -= amount;
  
      if (receiver.idusertype == GREENEAT_USER) {
        await Transaction.transfer(transaction, sender);
      } else {
        receiver.balance += amount;
        await Transaction.transfer(transaction, sender, receiver);
      }
  
      res.send();
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Erro ao processar transação!" });
    }
  };