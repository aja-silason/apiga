const connection = require("../utils/ConexaoBD")

async function Query(query, res, verbo){

    const isGet = verbo == 'get';
    const isPost = verbo == 'post';
    const isPatch = verbo == 'patch';
    const isDelete = verbo == 'delete';


    try {
        connection.query(query, (err, results)=>{
            if(results.affectedRows != 0){
                if(err){
                    console.error("Erro na query", err);
                    res.status(422).json({alerta: "Erro de sintaxe"});
                    return;
                }
                if(isPost){
                    res.status(200).json({message: "Dados processados com sucesso."});
                    return;
                } else if(isGet){
                    if(results.length != 0){
                        res.status(200).json(results);
                        return;
                    }
                    res.status(422).json({aviso: "Sem registro."});
                } else if(isPatch){
                    res.status(200).json({message: "Dados actualizados com sucesso."});
                    return;
                } else if(isDelete) {
                    res.status(200).json({message: "Dados deletados com sucesso."});
                    return;
                } else {
                    res.status(422).json({aviso: "Verbo não especifico."});
                }
                return;
            } else {
                res.status(422).json({aviso: "Sem registro."});
            }
        })
    } catch (error) {
        res.status(500).json({alerta: "Servidor sem reação."});
    }
}

const TipoServico = {

    addTipoServico: async (req, res)=>{
        const {nome_servico, preco} = req.body;

        const query = `INSERT INTO tipo_servico (nome_servico, preco) VALUES ('${nome_servico}', '${preco}')`;

        const verbo = 'post';

        await Query(query, res, verbo);

    },
    updateTipoServico: async (req, res)=>{

        const id = req.params.id;

        const {nome_servico, preco} = req.body;

        const query = `UPDATE tipo_servico SET nome_servico = '${nome_servico}', preco = '${preco}' WHERE idTipo_servico = '${id}'`;

        const verbo = 'patch';

        await Query(query, res, verbo);

    },
    getTipoProjecto: async (req, res)=>{
        
        const query = "SELECT * FROM tipo_servico";

        const verbo = 'get';

        await Query(query, res, verbo);

    },

    getTipoServicoByNome: async (req, res)=>{
        
        const nome = req.params.nome;

        const query = `SELECT * FROM tipo_servico WHERE nome_servico LIKE '%${nome}%'`;

        const verbo = 'get';

        await Query(query, res, verbo);

    },

    deleTipoServico: async (req, res)=>{
        const id = req.params.id;

        const query = `DELETE FROM tipo_servico WHERE idTipo_servico = '${id}'`;

        const verbo = 'delete';

        await Query(query, res, verbo);

    }

}

module.exports = TipoServico;

/*

criar tipos de servicos no sistema (cópia, impressão, etc); POST *
eliminar serviços em actividade. DELETE *
actualizar serviços. PATCH *
ver os tipos de serviços pelo nome. GET/:nome *
ver os tipos de serviços. GET *

 */