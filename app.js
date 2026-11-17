// Ponto de entrada: configura o Express, a View Engine e registra as rotas.
const express = require('express');
const path = require('path');
const tarefaRoutes = require('./src/routes/tarefaRoutes');

const app = express();
const PORTA = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.urlencoded({ extended: true })); // lê dados de formulários (req.body)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', tarefaRoutes);

// Rota inexistente
app.use((req, res) => {
  res.status(404).render('erro', { mensagem: 'Página não encontrada.' });
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
