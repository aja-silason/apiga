const connection = require('../utils/ConexaoBD');

async function LogIn(email, senha, res, verbo){
    try {
        const isPost = verbo == 'post';
        const isGet = verbo == 'get';
        if(isPost){

            if(!email|| !senha){
                res.status(422).json({aviso: "Email e senha são obrigatórios"});
                return;
            } else{
                
                const query = `SELECT * FROM usuario WHERE email = '${email}' AND senha = md5('${senha}')`;
    
                connection.query(query, (err, results)=>{
                
                    if(results.length == 1){
                        res.status(201).json({success: true, message: "Usuario Logado."});
                        return;
                    } else {
                        res.status(200).json({success: false, aviso: "Dados de acesso incorreto."});
                    }
                });
            }

            return;

        } else if(isGet){

            if(!email|| !senha){
                res.status(422).json({aviso: "Email e senha são obrigatórios"});
                return;
            } else{
                
                const query = `SELECT * FROM usuario WHERE email = '${email}' AND senha = md5('${senha}')`;
    
                connection.query(query, (err, results)=>{
                
                    if(results.length == 1){
                        res.status(201).json(results);
                        return;
                    } else {
                        res.status(200).json({aviso: "Dados de acesso incorreto."});
                    }
                });
            }

            return;

        }
    } catch (error) {
        res.status(500).json({alerta: "Servidor sem reação."});
    }
}

const Login = {
    
    Logar: async (req, res) =>{

        const {email, senha} = req.body;
        const verbo = 'post';
        await  LogIn(email, senha, res, verbo);

    },

    Verlogs: async (req, res) =>{

        const {email, senha} = req.body;
        const verbo = 'get';
        await  LogIn(email, senha, res, verbo);

    }

}

module.exports = Login;