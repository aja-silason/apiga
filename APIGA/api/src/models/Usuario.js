const connection = require('../utils/ConexaoBD');

const Usuario = {
    getUsuario: async (req, res)=>{

        const query = 'SELECT * FROM usuario';

        await connection.query(query, (err, results)=>{
            try {
                if(results.affectedRows != 0){
                    if(err){
                        console.error("Erro na consulta", err);
                        res.status(422).json({alerta: "Consulta sem sucesso"});
                        return;
                    }
                    res.json(results);
                    return;
                }
            } catch (error) {
                res.status(500).json({erro: "Servidor sem ação."});
            }
        })
    },

    getOneUsuario: async (req, res)=>{
        
        const id = req.params.id

        const query = `SELECT * FROM usuario WHERE idUsuario = '${id}'`;

        await connection.query(query, (err, results)=>{
            try {
                console.log(results);
                if(results.length == 1){
                    if(err){
                        console.err("Erro na execução.");
                        res.status(422).json({aviso: "Erro na sintaxe."});
                        return;
                    }
                    res.json(results);
                    return;
                } else {
                    res.status(422).json({alerta: "Registro não encotrado."});
                }
            } catch (error) {
                res.status(500).json({erro: "Servidor sem ação."});
            }
        })

    },

    getOneUsuarioByUsername: async (req, res)=>{
        const username = req.params.username;

        const query = `SELECT * FROM usuario WHERE nome_usuario LIKE '%${username}%'`;

        try {
            
            await connection.query(query, (err, results)=>{
                // res.json(query);
                if(results.length != 0){
                    if(err){
                        console.error("Erro na requisição.");
                        res.status(422).json({alerta: "Erro de sintaxe"});
                        return;
                    }
                    res.status(200).json(results);
                    return;
                } else {
                    res.status(422).json({aviso: "Nenhum registro encontrado."});
                }
            });

        } catch (error) {
            res.status(500).json({erro: "Servidor sem reação."});
        }


    },

    addUsuario: async (req, res)=>{

        const {Funcionario_Empresa_idEmpresa,Funcionario_idFuncionario,Funcionario_Cargo_idCargo,nome_funcionario,nome_usuario,senha,imagem,email} = req.body;

        const query = `INSERT INTO usuario (Funcionario_Empresa_idEmpresa, Funcionario_idFuncionario, Funcionario_Cargo_idCargo, nome_funcionario, nome_usuario, senha, imagem, email) VALUES ('${Funcionario_Empresa_idEmpresa}', '${Funcionario_idFuncionario}', '${Funcionario_Cargo_idCargo}', '${nome_funcionario}', '${nome_usuario}', md5('${senha}'), '${imagem}', '${email}')`;


        await connection.query(query, (err, results)=>{
            try {
                if(results.affectedRows == 1){
                    if(err){
                        console.error("Erro na query", err);
                        res.status(422).json({alerta: "Erro ao cadastrar o usuario."});
                        return;
                    }
                    res.json({message: "Usuario cadastrado com sucesso"});
                    return;
                } else{
                    res.status(422).json({aviso: "Nenhum registro efectuado"});
                }
            } catch (error) {
                res.status(500).json({erro: `Servidor sem ação. ${error}`});
            }
        });
    },

    udpdateUsuario: async (req, res)=>{
        const id = req.params.id;

        const {Funcionario_Empresa_idEmpresa,Funcionario_idFuncionario,Funcionario_Cargo_idCargo,nome_funcionario,nome_usuario,senha,imagem,email} = req.body;

        const query = `UPDATE usuario SET Funcionario_Empresa_idEmpresa = '${Funcionario_Empresa_idEmpresa}', Funcionario_idFuncionario = '${Funcionario_idFuncionario}', Funcionario_Cargo_idCargo = '${Funcionario_Cargo_idCargo}', nome_funcionario = '${nome_funcionario}', nome_usuario = '${nome_usuario}', senha = '${senha}', imagem = '${imagem}', email = '${email}' WHERE idUsuario = '${id}'`;

        try {
            await connection.query(query, (err, results)=>{
                if(results.affectedRows != 0){
                    if(err){
                        console.error("Erro na requisição", err);
                        res.status(422).json({alerta: "Erro na sintaxe"});
                        return;
                    }
                    res.status(200).json({message: "dados alterados com sucesso."});
                    return;
                } else {
                    res.status(422).json({aviso: "Nenhuma linha encontrada"});
                }
            });
        } catch (error) {
            res.status(500).json({erro: `Servidor sem reação. ${error}`});
        }
    },

    deleteUsuario: async (req, res)=>{
        const id = req.params.id;

        const query = `DELETE FROM usuario WHERE idUsuario = '${id}'`;

        try {
            await connection.query(query, (err, results)=>{
                if(results.affectedRows != 0){
                    if(err){
                        console.error("Erro na execução.", err);
                        res.status(422).json({alerta: "Erro na sintaxe"});
                        return;
                    }
                    res.status(200).json({message: "Dados eliminados com sucesso."});
                    return;
                } else {
                    res.status(422).json({aviso: "Nenhum resgistro encontrado"});
                }
            });
        } catch (error) {
            res.status(500).json({erro: "Servidor sem reação."});
        }
    }

}

module.exports = Usuario;