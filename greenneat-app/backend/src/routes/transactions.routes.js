const authenticateToken = require('./middleware.js')

module.exports = app => {

    const transactionController = require("../controllers/transactions.controller.js");

    var router = require("express").Router();

    router.get("/", authenticateToken, transactionController.findByUserId)
    router.post("/request", authenticateToken, transactionController.request)
    router.post("/transfer", authenticateToken, transactionController.transfer)

    app.use("/api/transactions", router)
  
};