const path = require("path");

module.exports = {
  entry: "./src/index.js", // Arquivo de entrada do seu aplicativo
  output: {
    filename: "bundle.js", // Nome do arquivo de saída
    path: path.resolve(__dirname, "dist"), // Diretório de saída
  },
  module: {
    rules: [
      // Aqui você configuraria regras para lidar com diferentes tipos de arquivos, como JavaScript, CSS, etc.
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
      buffer: require.resolve("buffer/"),
      util: require.resolve("util/"),
      //stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      //"stream": false,
    },
  },
};
