const connection = require("../utils/ConexaoBD");

async function Query(query, res, verbo){
    try {
        await connection.query(query, (err, results)=>{

            const isPost = verbo == 'post';
            const isGet = verbo == 'get';
            const isPatch = verbo == 'patch';
            const isDelete = verbo == 'delete';

            if(results.affectedRows != 0){
                if(err){
                    console.error("Erro na sintaxe", err);
                    res.status(422).json({alerta: "Erro na query"});
                    return;
                }
                if(isPost){
                    res.status(200).json({message: "Dados enviados com sucesso."});
                    return;
                } else if(isGet){
                    if(results.length != 0){
                        res.status(200).json(results);
                        return;
                    } else {
                        res.status(200).json({aviso: "Sem registro."});
                    }
                    return;
                } else if(isPatch){
                    res.status(200).json({message: "Dados actualizados com sucesso."});
                    return;
                } else if(isDelete){
                    res.status(200).json({message: "Dados deletados com sucesso."});
                    return;
                } else {
                    res.status(422).json({aviso : "Verbo não especificado."});
                }
                return;
            } else{
                res.status(422).json({alerta: "Nenhum registro encontrado."});
            }
        });
    } catch (error) {
        res.status(500).json({alerta: "Servidor sem reação."});
    }
}

const Relatorio = {
    addRelatorio: async (req, res) => {
        
        const {Usuario_Funcionario_Cargo_idCargo, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario,nome_usuario, relatorio} = req.body;

        const query = `INSERT INTO relatorio (Usuario_Funcionario_Cargo_idCargo, Usuario_Funcionario_idFuncionario, Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario,nome_usuario, relatorio) VALUES ('${Usuario_Funcionario_Cargo_idCargo}', '${Usuario_Funcionario_idFuncionario}', '${Usuario_Funcionario_Empresa_idEmpresa}', '${Usuario_idUsuario}','${nome_usuario}', '${relatorio}')`;

        const verbo = 'post';

        await Query(query, res, verbo);

    },
    getRelatorio: async (req, res)=>{
        const query = `SELECT idRelatorio, nome_usuario, relatorio FROM relatorio`;

        const verbo = 'get';

        await Query(query, res, verbo);

    },
    updateRelatorio: async (req, res)=>{
        const id = req.params.id;

        const {relatorio} = req.body;

        const query = `UPDATE relatorio SET relatorio = '${relatorio}' WHERE Usuario_idUsuario = '${id}'`;

        const verbo = 'patch';

        await Query(query, res, verbo);

    },
    deleteRelatorio: async (req, res)=>{
        
        const id = req.params.id;

        const query = `DELETE FROM relatorio WHERE idRelatorio = '${id}'`;

        const verbo = 'delete';

        await Query(query, res, verbo);

    },
    getRelatorioByUserName: async (req, res)=>{

        const username = req.params.nome;

        const query = `SELECT idRelatorio, nome_usuario, relatorio FROM relatorio WHERE nome_usuario LIKE '%${username}%'`;

        const verbo = 'get';

        await Query(query, res, verbo);

    }
    
}

module.exports = Relatorio;