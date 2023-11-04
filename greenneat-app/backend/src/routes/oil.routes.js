const authenticateToken = require('./middleware.js')

module.exports = app => {

    const oilController = require("../controllers/oil.controller.js");

    var router = require("express").Router();
    
    router.post("/", authenticateToken, oilController.create)
    router.get("/", authenticateToken, oilController.findAll)
    router.post("/available", authenticateToken, oilController.request)
    router.get("/available", authenticateToken, oilController.findAvailables)
    router.get("/compare", authenticateToken, oilController.compare)
    router.get("/transfers", authenticateToken, oilController.findAllSupplierOils)
    router.get("/transfers/greeneat", authenticateToken, oilController.findGreeneatTransfers)
router.get("/collected", authenticateToken, oilController.findCollected)
router.put("/collect/:id", authenticateToken, oilController.collectOil)
router.put("/deliver/:id", authenticateToken, oilController.deliverOil)
    router.put("/restore/:id", authenticateToken, oilController.reverteStatus)

    app.use("/api/oils", router)
  
};