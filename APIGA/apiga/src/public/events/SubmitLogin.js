const Logar = document.getElementById("logar");

let errDiv = document.querySelector('.divErro');

Logar.addEventListener('submit', async (e)=>{
    e.preventDefault();

    let email = document.querySelector('.email').value;
    let senha = document.querySelector('.senha').value;


    try {
        const response = await fetch('http://localhost:3000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, senha
            })
        });


        const data = await response.json();
        
        
        if(data.success){

            const resposta = await fetch('http://localhost:3300/api/usuarios/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const dados = await resposta.json();
            
            for(let i in dados){
                var nivelEmail = dados[i].email;
                var nivel = dados[i].Funcionario_Cargo_idCargo;
                // console.log(nivel);
                
                if(nivel == 1 && email == nivelEmail){
                    window.location.href = '/ceo/';
                    return;
                } else if(nivel == 2 && email == nivelEmail){
                    window.location.href = '/cto/';
                    return;
                } else if(nivel == 3 || nivel == 4 || nivel == 5 && email == nivelEmail){
                    window.location.href = '/dev/';
                    return;
                } else if(nivel == 6 && email == nivelEmail){
                    window.location.href = '/manager-project/';
                    return;
                } else if(nivel == 7 && email == nivelEmail){
                    window.location.href = '/designer/';
                    return;
                } else if(nivel == 9 && email == nivelEmail){
                    window.location.href = '/manager/';
                    return;
                } else if(nivel == 10 && email == nivelEmail){
                    window.location.href = '/contabilista/';
                    return;
                } else if(nivel == 12 && email == nivelEmail){
                    window.location.href = '/rh/';
                    return;
                } else {
                    errDiv.innerHTML = ''
                }
                
            }
            return;

        } else {
            errDiv.classList.add('error');
            errDiv.innerHTML = `<span>${data.message} </span>`;

            setTimeout(function(){
                errDiv.classList.remove('error');
                errDiv.innerHTML = '';
            }, 3000);
        }
            
    } catch (error) {
        console.error("Erro ao fazer o login.", error);
    }

});