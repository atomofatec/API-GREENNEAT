const authenticateToken = require('../routes/middleware.js')

module.exports = app => {

    const userController = require("../controllers/user.controller.js");

    var router = require("express").Router();

    router.get("/users", authenticateToken, userController.findAll)
    router.get("/users/:id",authenticateToken, userController.findById)
    router.post("/users", userController.create)
    router.delete("/users/:id",authenticateToken, userController.delete)
    router.post("/login", userController.login)

    app.use("/api", router)
  
};