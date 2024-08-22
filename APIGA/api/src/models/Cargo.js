const connection = require('../utils/ConexaoBD');

const Cargo = {

    addCargo: async (req, res)=>{

        const {cargo, pretensao_salarial} = req.body;

        const query = `INSERT INTO cargo (cargo, pretensao_salarial) VALUES ('${cargo}', '${pretensao_salarial}')`;

        await connection.query(query, (err, results)=>{
            try {
                if(results.affectedRows == 1){
                    if(err){
                        console.error("Erro ao  excutar a query", err);
                        res.status(422).json({erro: 'Erro ao cadastrar'});
                        return;
                    }
                    res.json({message: "Dados registrados com sucesso."});
                    return;
                } else {
                    res.status(422).json({aviso: "Erro ao cadastrar."});
                }
            } catch (error) {
                res.status(500).json({erro: "O servidor está sem reação."});
            }
        });

    },

    getAllCargos: async (req, res)=>{
        const query = `SELECT * FROM cargo`;

        await connection.query(query, (err, results)=>{
            try {
                if(results.affectedRows !=0){
                    if(err){
                        console.error("Erro na execução da consulta", err);
                        res.status(422).json({erro: "Erro ao obter os dados do BD"});
                        return;
                    }
                    res.json(results);
                    return;
                } else {
                    res.status(200).json({aviso: "Nenhum cargo encontrado."});
                }
                
            } catch (error) {
                res.status(500).json({erro: "Erro no servidor, servidor sem reação."});
            }
        });
    },

    getOneCargo: async (req, res)=>{
        const id = req.params.id;
        const {cargo, pretensao_salarial} = req.body;

        const query = `SELECT * FROM cargo WHERE idCargo = '${id}'`;

        await connection.query(query, (err, results)=>{
            try {
                if(results.length == 1){
                    if(err){
                        console.error("Erro ao obter dados.");
                        res.status(422).json({alerta: "Dados não encontrado"});
                    }
                    res.json(results);
                    return;
                } else {
                    res.status(422).json({aviso: "Dados não escontrados."});
                }
            } catch (error) {
                res.status(500).json({erro: "Servidor sem reação."});
            }
        });

    },

    updateCargo: async (req, res) =>{
        const id = req.params.id;
        const {cargo, pretensao_salarial} = req.body;

        const query = `UPDATE cargo SET cargo = '${cargo}', pretensao_salarial = '${pretensao_salarial}' WHERE idCargo = '${id}'`;

        await connection.query(query, (err,results)=>{
            try {
                if(results.affectedRows ==0){
                    if(err){
                        console.error("Erro na sintaxe.");
                        res.status(422).json({erro: "Dados não alterados por erro na sintaxe."});
                        return;
                    }
                    res.json({message: "Dados alterados com sucesso."});
                    return;
                } else{
                    res.status(422).json({aviso: "Dados não alterados."});
                }
            } catch (error) {
                res.status(500).json({erro: `Servidor sem reação. ${error}`});
            }
        });
    },

    deleteCargo: async (req, res) =>{
        const id = req.params.id;

        const {cargo, pretensao_salarial} = req.body;

        const query = `DELETE FROM cargo WHERE idCargo = '${id}'`;

        await connection.query(query, (err, results)=>{
            try {
                if(results.affectedRows == 1){
                    if(err){
                        console.error("Erro na query", err);
                        res.status(422).json({alerta: "Erro de sintaxe."})
                        return;
                    }
                    res.json({message: "Dados apagados com sucesso."});
                    return;
                } else{
                    res.status(422).json({aviso: "Nenhum registro encontrado."});
                }
            } catch (error) {
                res.status(500).json({erro: "Servidor sem ação", error: `${error}`});
            }
        });

    }

}

module.exports = Cargo;