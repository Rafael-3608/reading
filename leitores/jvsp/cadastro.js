const formRegister = document.getElementById('form-register');

if (formRegister) {
    formRegister.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('reg-nome').value;
        const email = document.getElementById('reg-email').value;
        const senha = document.getElementById('reg-senha').value;

        let usuarios = JSON.parse(localStorage.getItem('usuarios_reading')) || [];
        
        // Verifica se o e-mail já existe na base de dados
        let usuarioExistente = usuarios.find(user => user.email === email);

        if (usuarioExistente) {
            // Se já existe, avisa o usuário e faz o login automático com a conta encontrada!
            alert('Este e-mail já possui conta! Entrando automaticamente...');
            
            localStorage.setItem('ultimo_email_salvo', email);
            sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioExistente));
            
            window.location.href = 'leitores/leitores.html';
            return;
        }

        // Se for um usuário novo, cadastra normalmente
        const novoUsuario = { nome, email, senha };
        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios_reading', JSON.stringify(usuarios));
        localStorage.setItem('ultimo_email_salvo', email);

        // Cria a sessão e vai para a página de leitores
        sessionStorage.setItem('usuarioLogado', JSON.stringify(novoUsuario));
        window.location.href = 'leitores/leitores.html';
    });
}