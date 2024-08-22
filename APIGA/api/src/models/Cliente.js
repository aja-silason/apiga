const connection = require('../utils/ConexaoBD');

async function Query(query, res, verbo){
    try {
        connection.query(query, (err, results)=>{
            
            //Variaveis para controlar os verbos
            const isPost = verbo == 'post';
            const isGet = verbo == 'get';
            const isPatch = verbo == 'patch';
            const isDelete = verbo == 'delete';

            if(results.affectedRows !=  0){
                if(err){
                    console.error("Erro na consulta.", err);
                    res.status(422).json({aviso: "Erro na sintaxe."});
                    return;
                }

                //Verificando o verbo da query
                if(isPost){
                    res.status(200).json({message: "Dados adicionado com sucesso"});
                    return;
                } else if(isGet){

                    if(results.length != 0){
                        res.status(200).json(results);
                        return;
                    }
                    res.status(200).json({message: "Sem registros."});
                    return;
                } else if (isDelete){
                    res.status(200).json({message: "Dados eliminados com sucesso."});
                    return;
                } else if (isPatch){
                    res.status(200).json({message: "Dados actualizados com sucesso."});
                    return;
                } else {
                    res.status(422).json({alerta : "Especifica o verbo da query"});
                }
                return;
            } else{
                res.status(422).json({alerta: "Nenhum registro encontrado."});
            }
        });
    }
    catch (error) {
        res.status(500).json({erro: `Servidor sem reação. ${error}`});
    }
    return;
}

const Cliente = {
    
    addCliente: async (req, res)=>{

        const {Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario, Usuario_Funcionario_Cargo_idCargo, nome, contacto, email} = req.body;

        const query = ` INSERT INTO cliente (Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario, Usuario_Funcionario_Cargo_idCargo, nome, contacto, email) VALUES ('${Usuario_Funcionario_idFuncionario}', '${Usuario_Funcionario_Empresa_idEmpresa}', '${Usuario_idUsuario}', '${Usuario_Funcionario_Cargo_idCargo}', '${nome}', '${contacto}', '${email}')`;

        const verbo = 'post';

        await Query(query, res, verbo);

        
    },

    getCliente: async (req, res)=>{

        const query = "SELECT * FROM cliente";

        const verbo = 'get';

        await Query(query, res, verbo);

    },

    getOneCliente: async (req, res)=>{

        const id = req.params.id;

        const query = `SELECT * FROM cliente WHERE idCliente = '${id}'`;

        const verbo = 'get';

        await Query(query, res, verbo);

    },

    getClienteByName: async (req, res)=>{
        const nome = req.params.nome;

        const query = `SELECT * FROM cliente WHERE nome LIKE '%${nome}%'`;

        const verbo = 'get';

        await Query(query, res, verbo);

    },

    deleteCliente: async (req, res)=>{

        const id = req.params.id;

        const query = `DELETE FROM cliente WHERE idCliente = '${id}'`;
        
        const verbo = 'delete';

        await Query(query, res, verbo);

    },

    updateCliente: async (req, res)=>{

        const id = req.params.id;

        const {Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario, Usuario_Funcionario_Cargo_idCargo, nome, contacto, email} = req.body;
        
        const query = `UPDATE cliente SET Usuario_Funcionario_idFuncionario = '${Usuario_Funcionario_idFuncionario}', Usuario_Funcionario_Empresa_idEmpresa = '${Usuario_Funcionario_Empresa_idEmpresa}', Usuario_idUsuario = '${Usuario_idUsuario}', Usuario_Funcionario_Cargo_idCargo = '${Usuario_Funcionario_Cargo_idCargo}', nome = '${nome}', contacto = '${contacto}', email = '${email}' WHERE idCliente = '${id}'`;

        const verbo = 'patch';

        await Query(query, res, verbo);

    }

}

module.exports = Cliente;