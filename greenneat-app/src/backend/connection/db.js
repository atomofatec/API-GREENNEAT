// configuração do servidor
const app = require("../routes/routes");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Servidor sendo executado");
});