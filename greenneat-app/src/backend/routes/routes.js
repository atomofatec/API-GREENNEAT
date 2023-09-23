const express = require("express");
const cors = require("cors");
const { registerFunction } = require("../functions/register/register.functions");
const app = express();

app.use(cors());
app.use(express.json());

//rota cadastro
app.post('/registerUser', registerFunction);

module.exports = app;