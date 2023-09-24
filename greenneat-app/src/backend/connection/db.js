// configuração do servidor
require("dotenv").config();

const app = require("../routes/routes");

try {
  const PORT = process.env.PORT || 3001;

  app.listen(PORT, () => {
    console.log(`Servidor sendo executado na porta ${PORT}`);
  });
} catch (error) {
  console.error("Ocorreu um erro:", error);
}
