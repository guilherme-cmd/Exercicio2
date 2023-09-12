const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const apiRouter = require('./api/routes/apiRouter');
app.use('/api', apiRouter);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta "public" para o root e outras rotas não correspondidas
app.use(express.static(path.join(__dirname, '/public')));

// Redirecionar todas as solicitações não correspondidas para a página inicial
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
