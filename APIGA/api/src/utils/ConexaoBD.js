const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.BD_HOST,
    user: process.env.BD_USUARIO,
    password: process.env.BD_SENHA,
    database: process.env.BASE_DE_DADOS
});

connection.connect((err) => {
    try{
        if(err){
            console.error("Erro ao conectar com o Banco de Dados");
            console.log("Contacte o gestor do Banco de dados.")
            return;
        }
        console.log("=========================================");
        console.log("================APIGA v1=================");
        console.log("=========================================");
        console.log("Conexão com o banco de dados bem sucedida");
        console.log("=========================================");
        console.log("===AJA TFC - Todos direitos reservados===");
        console.log("=========================================");
        console.log("================APIGA v1=================");
        console.log("=========================================");

    }catch(err){
        err.status(500).json({erro: "Servidor sem ação."});
    }
});

module.exports = connection;