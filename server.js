const express = require('express');
const app = express();
const port = 3000;

// Definir o motor de visualização como EJS
app.set('view engine', 'ejs');

// Configurar a pasta de arquivos estáticos (CSS, imagens, etc.)
app.use(express.static('public'));

// Função para gerar números de bingo sem repetições
function gerarCartela() {
  const colunas = {
    B: sortearNumeros(1, 18, 5),
    I: sortearNumeros(19, 36, 5),
    N: sortearNumeros(37, 54, 4), // O espaço do meio é reservado para "Free"
    G: sortearNumeros(55, 72, 5),
    O: sortearNumeros(73, 90, 5)
  };
  colunas.N.splice(2, 0, 'Free'); // Adiciona 'Free' no centro
  return colunas;
}

// Função para sortear números dentro de um intervalo
function sortearNumeros(min, max, quantidade) {
  const numeros = [];
  while (numeros.length < quantidade) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numeros.includes(num)) {
      numeros.push(num);
    }
  }
  return numeros;
}

app.get('/', (req, res) => {
  const cartela = gerarCartela();
  res.render('index', { cartela });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
