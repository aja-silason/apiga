const connection = require("../utils/ConexaoBD");


async function Query(query, res, verbo){
    try {
        
        await connection.query(query, (err, results)=>{
            const isPost = verbo == 'post';
            const isGet = verbo == 'get';
            const isPatch = verbo == 'patch';
            const isDelete = verbo == 'delete';
            
            if(results.affectedRows != 0 ){
                if(err){
                    console.error("Erro na query", err);
                    res.status(422).json({aviso: "Erro de sintaxe"});
                    return;
                }

                if(isPost){
                    res.status(201).json({message: "Dados adicionado com sucesso."});
                    return;
                } else if(isGet){
                    if(results.length != 0){
                        res.status(200).json(results);
                        return;
                    } else {
                        res.json(200).json({aviso: "Sem registros."});
                    }
                    return;
                } else if(isPatch){
                    res.status(200).json({message: "Dados actualizados com sucesso"});
                    return;
                } else if(isDelete){
                    res.status(200).json({message: "Dados deletados com sucesso."});
                    return;
                } else {
                    res.status(422).json({aviso: "Verbo não especifico."});
                }

                return;
            } else {
                res.status(422).json({alerta: "Nenhuma query encontrada. :("});
            }
        });

    } catch (error) {
        res.status(500).json({alerta: "Servidor sem reação."});
    }
}


const Investimento = {

    addInvestimento: async (req, res)=>{
        
        const {Usuario_Funcionario_Cargo_idCargo, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario, Contabilidade_Empresa_idEmpresa, Contabilidade_idContabilidade, nome_investimento, proposta, servico_investir, valor_investir} = req.body;

        const query = `INSERT INTO investimento (Usuario_Funcionario_Cargo_idCargo, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario, Contabilidade_Empresa_idEmpresa, Contabilidade_idContabilidade, nome_investimento, proposta, servico_investir, valor_investir) VALUES ('${Usuario_Funcionario_Cargo_idCargo}', '${Usuario_Funcionario_idFuncionario}', '${Usuario_Funcionario_Empresa_idEmpresa}', '${Usuario_idUsuario}', '${Contabilidade_Empresa_idEmpresa}', '${Contabilidade_idContabilidade}', '${nome_investimento}', '${proposta}', '${servico_investir}', '${valor_investir}')`;

        const verbo = 'post';

        await Query(query, res, verbo);

    },

    getInvestimento: async (req, res)=>{
        
        const query = `SELECT * FROM investimento`;

        const verbo = 'get';

        await Query(query, res, verbo);

    },

    updateInvestimento: async (req, res)=>{
        
        const id = req.params.id;

        const {valor_investir} = req.body;

        const query = `UPDATE investimento SET valor_investir = '${valor_investir}' WHERE idInvestimento = '${id}'`;

        const verbo = 'patch';

        await Query(query, res, verbo);

    },

    deleteInvestimento: async (req, res)=>{
        const id = req.params.id;

        const query = `DELETE FROM investimento WHERE idInvestimento = ${id}`;

        const verbo = 'delete';

        await Query(query, res, verbo);

    }
}

module.exports = Investimento;

/*


	idInvestimento, Usuario_Funcionario_Cargo_idCargo, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario, Contabilidade_Empresa_idEmpresa, Contabilidade_idContabilidade, nome_investimento, proposta, servico_investir, valor_investir






*/