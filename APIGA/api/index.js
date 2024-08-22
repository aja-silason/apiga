const express = require('express');
const app = express();
require('dotenv').config();

const Rotas = require('./src/routes/Rotas');

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res)=>{
    res.send("Bem vindo a API 'Apiga'.");
})
app.use('/api', Rotas);

app.listen(process.env.PORT || 3300);

console.log("Servidor Rodando");