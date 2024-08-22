const connection = require('../utils/ConexaoBD');

async function Query(query, res, verbo){

    try {
        await connection.query(query, (err, results)=>{

            const isPost = verbo == 'post';
            const isGet = verbo == 'get';
            const isPatch = verbo == 'patch';
            const isDelete = verbo == 'delete';

            if(results.affectedRows != 0){

                if(err){
                    console.error("Erro de sintaxe", err);
                    res.status(422).json({alerta: "Erro na query"});
                    return;
                }
                if(isPost){
                    res.status(201).json({message: "Dados adicionados com sucesso."});
                    return;
                } else if(isGet){
                    if(results.length != 0){
                        res.status(200).json(results);
                        return;
                    } else {
                        res.status(200).json({aviso: "Sem registro."});
                    }
                    return;
                }  else if(isPatch){
                    res.status(200).json({message: "Dados actualizados com sucesso."});
                    return;
                } else if(isDelete) {
                    res.status(200).json({message: "Dados deletados com sucesso."});
                    return;
                } else {
                    res.status(422).json({aviso: "Verbo incorrecto."});
                }
                return;
            } else {
                res.json({alerta: "Sem reação."});
            }
        });
    } catch (error) {
        res.status(500).json({alerta: "Servidor sem reação."});
    }

}

const Pagamento_funcionario = {

    getPagamento: async (req, res)=>{
        const query = `SELECT * FROM pagamento_funcionario`;

        const verbo = 'get';

        await Query(query, res, verbo);

    },
    addPagamento: async (req, res)=>{
        const {Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario, Funcionario_Empresa_idEmpresa, Funcionario_idFuncionario, Contabilidade_Empresa_idEmpresa, Contabilidade_idContabilidade, Funcionario_Cargo_idCargo, Usuario_Funcionario_Cargo_idCargo, nome_funcionario, nome_contabilista, salario, mes_pagamento} = req.body;

        const query = `INSERT INTO pagamento_funcionario (Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario, Funcionario_Empresa_idEmpresa, Funcionario_idFuncionario, Contabilidade_Empresa_idEmpresa, Contabilidade_idContabilidade, Funcionario_Cargo_idCargo, Usuario_Funcionario_Cargo_idCargo, nome_funcionario, nome_contabilista, salario, mes_pagamento) VALUES ('${Usuario_Funcionario_idFuncionario}', '${Usuario_Funcionario_Empresa_idEmpresa}', '${Usuario_idUsuario}', '${Funcionario_Empresa_idEmpresa}', '${Funcionario_idFuncionario}', '${Contabilidade_Empresa_idEmpresa}', '${Contabilidade_idContabilidade}', '${Funcionario_Cargo_idCargo}', '${Usuario_Funcionario_Cargo_idCargo}', '${nome_funcionario}', '${nome_contabilista}', '${salario}', '${mes_pagamento}')`;

        const verbo = 'post';

        await Query(query, res, verbo);

        
    }
}

module.exports = Pagamento_funcionario;