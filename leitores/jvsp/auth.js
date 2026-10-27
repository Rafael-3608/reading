// Preenche automaticamente o último e-mail salvo quando a página carrega
window.addEventListener('DOMContentLoaded', () => {
    const ultimoEmail = localStorage.getItem('ultimo_email_salvo');
    if (ultimoEmail) {
        const inputEmail = document.getElementById('login-email');
        if (inputEmail) {
            inputEmail.value = ultimoEmail;
        }
    }
});

// Lógica de Login
const formLogin = document.getElementById('login-form');

if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
        // Impede o comportamento padrão de recarregar a tela do HTML
        e.preventDefault();
        
        const emailInput = document.getElementById('login-email');
        const senhaInput = document.getElementById('login-senha');

        if (!emailInput || !senhaInput) {
            alert('Erro: Campos do formulário não encontrados.');
            return;
        }

        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();

        // Busca os usuários salvos no localStorage
        let usuarios = JSON.parse(localStorage.getItem('usuarios_reading')) || [];
        
        // Procura se existe o usuário correspondente
        const usuarioEncontrado = usuarios.find(user => user.email === email && user.senha === senha);

        if (usuarioEncontrado) {
            // Salva a sessão do usuário
            sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
            localStorage.setItem('ultimo_email_salvo', email);
            
            // Redireciona para o painel principal de leitores
            window.location.href = 'leitores/leitores.html';
        } else {
            alert('E-mail ou senha incorretos! Verifique os dados digitados.');
        }
    });
}