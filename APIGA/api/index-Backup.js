const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config();


app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());


//Conectando com o bd **Model

const connection = mysql.createConnection({
    host: process.env.BD_HOST,
    user: process.env.BD_USUARIO,
    password: process.env.BD_SENHA,
    database: process.env.BASE_DE_DADOS
});

connection.connect((err) => {
    try{
        if(err){
            console.log("Erro ao conectar com o Banco de Dados", err);
            return;
        } else {
            console.log("Conexão com o banco de dados bem suceedida");
        }
    }catch(err){
        err.status(500).json({erro: "Erro na conexão."});
    }
});

//Pegar rota get os dados do Bd **Router

app.get('/dados', async (req,res)=>{
    const query = 'SELECT * FROM funcionario';

    await connection.query(query, (err, results)=>{
        try {
            if(results.length != 0){
                if(err){
                    console.error('Erro na execução da consulta: ', err);
                    res.status(422).json({error: 'Erro ao obter os dados do Banco de dados.'});
                    return;
                }
                res.json(results);
                return;
            } else {
                res.status(200).json({aviso: "Os campos da tabela estão vazios."});
            }
        } catch (error) {
            res.status(500).json({erro: "Erro no servidor, o servidor ficou sem reação."});
        }

    });

});

//Rota get um dados em especifico

app.get('/dados/:id', async (req,res)=>{

    const id = req.params.id;

    const query = `SELECT * FROM funcionario WHERE idFuncionario = '${id}'`;

    try {
        await connection.query(query, (err, results)=>{
            
            //Verificar se existe um regstro no BD 
            if(results.length == 1){

                //Verificando se tem erro na consulta ou dados não encontrados.
                if(err){
                    console.error('Erro na execução da consulta: ', err);
                    res.status(422).json({error: 'Erro, dados não encontrado.'});
                    return;
                }
                //Apresentado o registro na BD
                res.json(results);
                return;
            } else{
                res.status(422).json({erro: 'Erro, Dados da consulta não encontrados.'});
            }
            
        });
        
    } catch (error) {
        res.status(500).json({error: "Erro no servidor, o servidor ficou sem reação."});
    }

});

//Rota de Delete pelo id
app.delete('/dados/:id', async(req,res)=>{
    const id = req.params.id;
    const query = `DELETE FROM funcionario WHERE idFuncionario = '${id}'`;
    
    try {
        await connection.query(query, (err, results)=>{

            if(results.affectedRows != 0){
                if(err){
                    console.error("Erro ao Deletar a linha", err);
                    res.status(422).json({erro: 'Erro, dados não encotrado.'});
                    return;
                } 
                res.json({message: "Sucesso. Dados deletados com sucesso."});
            
                return;              
            } else {
                res.status(422).json({erro: "Dados não encontrados."});
            }
        });
    } catch (error) {
        res.status(500).json({erro: "Erro no servidor, o servidor está sem reação."});
    }

}); 



//Pegar rota post os dados do Bd **Router

app.post('/dados', async (req, res)=>{

    const {Empresa_idEmpresa,Cargo_idCargo, nome, endereco, contacto, nivel_academico, data_contrato} = req.body;
    
    const query = `INSERT INTO funcionario (Empresa_idEmpresa,Cargo_idCargo, nome, endereco, contacto, nivel_academico, data_contrato) VALUES ('${Empresa_idEmpresa}','${Cargo_idCargo}','${nome}','${endereco}', '${contacto}', '${nivel_academico}', '${data_contrato}')`;

    try {
        await connection.query(query, (err, results)=>{

            if(results.affectedRows == 1){
                if(err){
                    console.error("Erro ao executar a consulta.", err);
                    res.status(500).json({erro: 'Erro ao adicionar dados ao banco de dados.'});
                    return;
                } else{
                    res.json({message: 'Dados adicionados com sucesso!'});
                }
                return;
            } else {
                res.status(422).json({erro: "Dados não cadastrado, verifique os campos."})
            }
        })
    } catch (error) {
        res.status(500).json({erro: "Erro no servidor, o servidor esta sem reação."});
    }

});

//Rota Update
app.patch('/dados/:id', async (req, res)=>{

    const id = req.params.id;

    const {Empresa_idEmpresa,Cargo_idCargo, nome, endereco, contacto, nivel_academico, data_contrato} = req.body;

    const query = `UPDATE funcionario SET Empresa_idEmpresa = '${Empresa_idEmpresa}',Cargo_idCargo = '${Cargo_idCargo}', nome = '${nome}', endereco = '${endereco}', contacto = '${contacto}', nivel_academico = '${nivel_academico}', data_contrato ='${data_contrato}' WHERE idFuncionario = '${id}'`;

    await connection.query(query, (err, results)=>{
        try {

            if(results.affectedRows != 0){
                if(err){
                    console.error("Erro ao fazer o update.");
                    res.status(422).json({erro: "Erro ao actualizar a linha."});
                    return;
                } else{
                    res.json({message: "Dados actualizados com sucesso."});
                }
                return;
            } else {
                res.status(422).json({aviso: "Nenhum registro encontrado para ser actualizado."});
            }
            
        } catch (error) {
            res.status(500).json({erro: "Erro no servidor, o servidor está sem reação."});
        }
    });


});



router.get('/', function(req,res,next){
    res.sendFile(path.join(__dirname+'/src/index.html'));
});

app.use('/', router);

app.listen(express.env || 3300);

console.log("Servidor Rodando");