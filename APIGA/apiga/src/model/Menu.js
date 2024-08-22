const Menu = {
    menu: async (req, res)=>{
        try{
            const response = await fetch('http://localhost:3300/api/login/', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
              });



        } catch(e){
            res.status(401).json({aviso: "Erro ao requerir o menu"});
        }
    }
}

module.exports = Menu;