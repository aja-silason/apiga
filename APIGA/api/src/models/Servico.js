const connection = require("../utils/ConexaoBD");

async function Query(query, res, verbo){
    try {
        await connection.query(query, (err, results)=>{
            const isPost = verbo == 'post';
            const isGet = verbo == 'get';
            const isPatch = verbo == 'patch';
            const isDelete = verbo == 'delete';

            if(results.affectedRows !=0){
                if(err){
                    console.error("Erro na query", err);
                    res.status(422).json({alerta : "Erro na sintaxe."});
                    return;
                }
                
                if(isPost){
                    res.status(200).json({message: "Dados adicionado com sucesso."});
                    return;
                } else if(isGet){
                    if(results.length !=0){
                        res.status(200).json(results);
                        return;
                    }
                    res.status(200).json({message: "Sem registro."});
                    return;
                } else if(isPatch){
                    res.status(200).json({message: "Dados actualizado com sucesso."});
                    return;
                } else if(isDelete){
                    res.status(200).json({message: "Dados deletados com sucesso."});
                    return;
                } else{
                    res.status(422).json({alerta: "Verbo não especificado."});
                }

                return;
            } else{
                res.status(422).json({aviso: "Dados não econtrados."});
            }
        });
    } catch (error) {
        res.status(500).json({alerta: "Servidor sem reação.", error});
    }
}

const Servico = {
    addServico: async (req, res)=>{
        
        const {Tipo_servico_idTipo_servico, Usuario_Funcionario_idFuncionario,Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario, Usuario_Funcionario_Cargo_idCargo, descricao_servico, quantidade_servico, valor_pago} = req.body;

        const query = `INSERT INTO servico (Tipo_servico_idTipo_servico, Usuario_Funcionario_idFuncionario,Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario, Usuario_Funcionario_Cargo_idCargo, descricao_servico, quantidade_servico, valor_pago) VALUES ('${Tipo_servico_idTipo_servico}', '${Usuario_Funcionario_idFuncionario}','${Usuario_Funcionario_Empresa_idEmpresa}', '${Usuario_idUsuario}', '${Usuario_Funcionario_Cargo_idCargo}', '${descricao_servico}', '${quantidade_servico}', '${valor_pago}')`;

        const verbo = 'post';

        await Query(query, res, verbo);

    },
    getServico: async (req, res)=>{

        const query = "SELECT idServico, descricao_servico, quantidade_servico, valor_pago FROM servico";

        const verbo = 'get';

        await Query(query, res, verbo);

    }, 
    getServicoById: async (req, res)=>{
        const id = req.params.id;
        
        const query = `SELECT idServico, descricao_servico, quantidade_servico, valor_pago FROM servico WHERE idServico = '${id}'`;

        const verbo = "get";

        await Query(query, res, verbo);
        
    },
    updateServico: async (req, res)=>{
        const id = req.params.id;
        
        const {descricao_servico, quantidade_servico, valor_pago} = req.body;

        const query = `UPDATE servico SET descricao_servico = '${descricao_servico}', quantidade_servico = '${quantidade_servico}', valor_pago = '${valor_pago}' WHERE idServico = '${id}'`;

        const verbo = "patch";

        await Query(query, res, verbo);

    },
    deleteServico: async (req, res)=>{
        
        const id = req.params.id;

        const query = `DELETE FROM servico WHERE idServico = '${id}'`;

        const verbo = 'delete';

        await Query(query, res, verbo);
    }

}

module.exports = Servico;