const authenticateToken = require('./middleware.js')

module.exports = app => {

    const oilController = require("../controllers/oil.controller.js");

    var router = require("express").Router();
    
    router.post("/", authenticateToken, oilController.create)
    router.get("/", authenticateToken, oilController.findAll)
    router.post("/available", authenticateToken, oilController.request)
    router.get("/available", authenticateToken, oilController.findAvailables)
    router.get("/compare", authenticateToken, oilController.compare)
    

    app.use("/api/oils", router)
  
};