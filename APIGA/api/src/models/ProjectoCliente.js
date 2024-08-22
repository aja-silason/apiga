const connection = require('../utils/ConexaoBD');

async function Query(query, res, verbo){
    try {
        connection.query(query, (err, results)=>{

            const isPost = verbo == 'post';
            const isGet = verbo == 'get';
            const isPatch = verbo == 'patch';
            const isDelete = verbo == 'delete';

            if(results.affectedRows != 0){
                if(err){
                    console.error("Erro na query");
                    res.status(422).json({alerta: "Erro na sintaxe."});
                    return;
                }
                //Pegar o verbo
                if(isPost){
                    res.status(200).json({message: "Dados adicionado com sucesso."});
                    return;
                } else if (isGet){
                    if(results.length != 0){
                        res.status(200).json(results);
                        return;
                    } else{
                        res.json({aviso: "Sem registro"});
                    }
                    return;
                } else if(isPatch){
                    res.status(200).json({message: "Dados actualizados com sucesso."});
                    return;
                } else if(isDelete){
                    res.status(200).json({message: "Dados Deletados com sucesso."});
                    return;
                } else {
                    res.json(422).json({aviso: "Verbo da query não especificado"});
                }
                return;

            } else{
                res.status(422).json({aviso: "Sem registro."});
            }
        });
    } catch (error) {
        res.status(500).json({erro: "Servidor sem reação."});
    }
}

const ProjectoCliente = {

    addProjecto: async (req, res)=>{

        const {Usuario_Funcionario_Cargo_idCargo, Usuario_Funcionario_idFuncionario,Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario, Cliente_idCliente, nome_projecto, orcamento, funcionario_responsavel, nome_cliente, tempo_inicio, tempo_termino, tempo_estimado} = req.body;

        //Por ter dois atributos que os valores serão os mesmos viu-se a ecessidade de usar-se apenas um atribbuto nna requisição do body *Usuario_Funcionario_Cargo_idCargo* e durante a query o seu valor contou como o valor de *Cliente_Usuario_Funcionario_Cargo_idCargo*;

        const query = `INSERT INTO projecto (Cliente_Usuario_Funcionario_Cargo_idCargo, Usuario_Funcionario_Cargo_idCargo, Usuario_Funcionario_idFuncionario,Usuario_Funcionario_Empresa_idEmpresa, Usuario_idUsuario, Cliente_idCliente, nome_projecto, orcamento, funcionario_responsavel, nome_cliente, tempo_inicio, tempo_termino, tempo_estimado) VALUES ('${Usuario_Funcionario_Cargo_idCargo}','${Usuario_Funcionario_Cargo_idCargo}', '${Usuario_Funcionario_idFuncionario}','${Usuario_Funcionario_Empresa_idEmpresa}', '${Usuario_idUsuario}', '${Cliente_idCliente}', '${nome_projecto}', '${orcamento}', '${funcionario_responsavel}', '${nome_cliente}', '${tempo_inicio}', '${tempo_termino}', '${tempo_estimado}')`;
        
        const verbo = 'post';
        await Query(query, res, verbo);
    },

    getProjecto: async (req, res)=>{

        const isCliente = "null";

        const query = `SELECT idProjecto, Usuario_idUsuario, Cliente_idCliente, nome_projecto, orcamento, funcionario_responsavel, nome_cliente, tempo_inicio, tempo_termino, tempo_estimado FROM projecto WHERE nome_cliente != '${isCliente}'`;
        
        const verbo = 'get';

        await Query(query, res, verbo);
    },

    updateProjecto: async (req, res)=>{

        const id = req.params.id;

        const {nome_projecto, orcamento, funcionario_responsavel, nome_cliente, tempo_inicio, tempo_termino, tempo_estimado} = req.body;


        const query = `UPDATE projecto SET nome_projecto = '${nome_projecto}', orcamento = '${orcamento}', funcionario_responsavel = '${funcionario_responsavel}', nome_cliente = '${nome_cliente}', tempo_inicio = '${tempo_inicio}', tempo_termino = '${tempo_termino}', tempo_estimado = '${tempo_estimado}' WHERE idProjecto = '${id}'`;
        
        const verbo = 'patch';

        await Query(query, res, verbo);

    },

    deleteProjecto: async (req, res)=>{
        const id = req.params.id;

        const query = `DELETE FROM projecto WHERE idProjecto = '${id}'`;

        const verbo = 'delete';

        await Query(query, res, verbo);

    },

    getProjectoByNomeCliente: async (req, res)=>{
        const nome = req.params.nome;

        const isCliente = 'null';

        const query = `SELECT idProjecto, Usuario_idUsuario, Cliente_idCliente, nome_projecto, orcamento, funcionario_responsavel, nome_cliente, tempo_inicio, tempo_termino, tempo_estimado FROM projecto WHERE nome_cliente != '${isCliente}' AND nome_cliente LIKE '%${nome}%'`;

        const verbo = 'get';

        await Query(query, res, verbo)

    }

}

module.exports = ProjectoCliente;

/*
Cliente
O Cliente solicitar/criar projecto, POST *
O projecto pode ser alterado, PATCH *
O projecto pode ser eliminado, DELETE *
O projecto pode ser visualizado pelo nome do Cliente, GET:id 
O projecto pode ser visualizado, GET *
*/