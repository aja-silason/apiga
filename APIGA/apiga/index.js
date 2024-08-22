const express = require('express');
const app = express();
const Rotas = require('./src/routes/Routes');
const path = require('path');
const session = require('express-session');
require('dotenv').config();



app.use((req, res, next)=> {

    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});

app.use((req, res, next)=>{
    if (req.url.endsWith('.js')) {
        res.set('Content-Type', 'text/javascript');
    }
    next();
});

app.use((req, res, next)=>{
    if (req.url.endsWith('.css')) {
        res.set('Content-Type', 'text/css');
    }
    next();
});

app.use(express.static(path.join(__dirname, '/src/public/events/')));

app.use(express.static(path.join(__dirname, '/src/public/images/')));

app.use(express.static(path.join(__dirname, '/src/public/js/')));

app.use(express.static(path.join(__dirname, '/src/controller/')));

app.use(express.static(path.join(__dirname, '/src/public/css/')));


app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.use(session({
    secret: process.env.MEU_SEGREDO,
    resave: false,
    saveUninitialized: true
}));

app.use('/', Rotas);

app.listen(express.env || 3000);

console.log("Servidor Rodando");