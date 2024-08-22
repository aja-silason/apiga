
const Login = {
    logar: async (req, res)=>{

        const {email, senha} = req.body;
        
            try{
        
            const response = await fetch('http://localhost:3300/api/login/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, senha })
            });
        
            
            if (response.status) { 
                const data = await response.json();
        
                if (data.success) {
        
                        req.session.user = { email };
                        res.json({ success: true, message: 'Login bem-sucedido' });
                        
                        return;
                    
                } else {
                    res.status(401).json({ success: false, message: 'Acesso negado. Dados de acesso incorrectos.' });
                }
                return;
            } else {
                    res.status(422).json({ success: false, message: 'Erro ao fazer login' });
            }
        
            } catch (error) {
            console.error('Erro ao fazer login:');
            res.status(500).json({ success: false, message: 'Erro ao fazer login' });
            }

    }
}

module.exports = Login;