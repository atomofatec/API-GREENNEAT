const authenticateToken = require('../routes/middleware.js')

module.exports = app => {

    const metricsController = require("../controllers/metrics.controller.js");

    var router = require("express").Router();

    router.get("/usersbyregion", authenticateToken, metricsController.usersByRegion)
    router.get("/topsuppliers", authenticateToken, metricsController.topSuppliers)
    router.get("/topregions", authenticateToken, metricsController.topRegions)
    router.get("/toptransactions/partners", authenticateToken, metricsController.topTransactionsPartner)
    router.get("/toptransactions/suppliers", authenticateToken, metricsController.topTransactionsSupplier)


    app.use("/api/metrics", router)
  
};