const connection = require('../utils/ConexaoBD');

const Funcionario = {

    //Modulo adiciona funcionario
    addFuncionario: async (req, res)=>{

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
    
    },

    //Modulo Pega todos funcionarios
    getAllFuncionarios: async (req,res)=>{
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
    },

    //Modulo Pega um funcionario
    getOneFuncionario: async (req,res)=>{

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
    },

    getOneFuncionarioByContact: async (req,res)=>{

        // const id = req.params.id;

        const contacto = req.params.contacto;

        const query = `SELECT * FROM funcionario WHERE contacto LIKE '%${contacto}%'`;

        console.log(query);
        try {
            await connection.query(query, (err, results)=>{            
                //Verificar se existe um regstro no BD 
                if(results.length != 0){
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
    },

    //Modulo Delete funcionario
    deleteFuncionario: async (req,res)=>{
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
    },

    //Modulo actualiza funcionario
    updateFuncionario: async (req, res)=>{

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
    
    
    }
}

module.exports = Funcionario;