/*
const vavItems = document.querySelectorAll('.nav-item[data-target]');
const contentViews = document.querySelectorAll('content-view');

navItems.forEach(item => {
    item.addeventListener('click',() =>{

    }
}); 
*/
const navItems = document.querySelectorAll('.nav-item[data-target]');
const contentViews = document.querySelectorAll('.content-view');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove classe ativa de todos os botões do menu
        navItems.forEach(i => i.classList.remove('active'));
        // Adiciona classe ativa apenas no botão clicado
        item.classList.add('active');

        // Esconde todas as telas de conteúdo
        contentViews.forEach(view => view.classList.remove('active-view'));
        
        // Pega o ID da tela alvo e mostra ela na tela
        const targetId = item.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active-view');
    });
});

// 2. INTERAÇÃO DE CLIQUE NOS LIVROS (MODAL DETALHADO)
const modal = document.getElementById('bookModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const bookCards = document.querySelectorAll('.book-card[data-synopsis]');

bookCards.forEach(card => {
    card.addEventListener('click', () => {
        // Coleta as informações dinâmicas de dentro do card clicado
        const title = card.querySelector('.book-title').innerText;
        const cover = card.querySelector('.book-cover').innerText;
        const synopsis = card.getAttribute('data-synopsis');

        // Aplica as informações direto dentro do Modal (Pop-up)
        document.getElementById('modalTitle').innerText = title;
        document.getElementById('modalCover').innerText = cover;
        document.getElementById('modalSynopsis').innerText = synopsis;

        // Abre o Modal com efeito fade-in
        modal.classList.add('modal-open');
    });
});

// Fechar o Modal ao clicar no 'X' ou fora da caixinha de conteúdo
closeModalBtn.addEventListener('click', () => modal.classList.remove('modal-open'));
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('modal-open');
});
//animação de abrir e fechar do chat
function toggleChat() {
    const chat = document.getElementById('meuChat');
    chat.classList.toggle('hidden');
}

function enviar(){
    let entrada = document.getElementById("entrada");
    let mensagens = document.getElementById("mensagens");

    let texto = entrada.value.trim();

    if(texto === ""){
        return;
    }

    // Mensagem do usuário
    mensagens.innerHTML += `<div class="mensagem usuario"><b>Você:</b> ${texto}</div>`;

    let resposta = responder(texto);

    // Resposta do bot
    setTimeout(() => {
        mensagens.innerHTML += `<div class="mensagem bot"><b>Bot:</b> ${resposta}</div>`;
        mensagens.scrollTop = mensagens.scrollHeight;
    },400);        
    entrada.value = "";

    mensagens.scrollTop = mensagens.scrollHeight;
    }

function responder(texto){

    texto = texto.toLowerCase();

    // Cumprimentos
    if(texto.includes("oi") || texto.includes("olá") || texto.includes("ola")){
        return "Olá! Eu sou o Lumina Bot. Como posso ajudar na sua leitura hoje? 📚";
    }

    if(texto.includes("tudo bem") || texto.includes("como voce esta")){
        return "Estou funcionando perfeitamente! Pronto para falarmos sobre livros. 😄";
    }

    // Sobre o Nome do Bot ou do Sistema
    if(texto.includes("seu nome") || texto.includes("quem é voce")){
        return "Eu sou o Lumina Bot, o assistente virtual da plataforma Lumina! 🤖";
    }

    // Dicas de Leitura / Recomendações (Respondendo ao que você testou!)
    if(texto.includes("dica") || texto.includes("leitura") || texto.includes("recomenda")){
        return "No momento, recomendo fortemente os nossos destaques: 'Orgulho e Preconceito' para quem ama clássicos, ou 'A Garota no Trem' se você curte um mistério! 👁️🚂";
    }

    // Funcionalidade de Autor
    if(texto.includes("autor") || texto.includes("escrever") || texto.includes("publicar")){
        return "Na Área do Autor, você poderá criar seus próprios manuscritos e gerenciar suas publicações! Basta clicar em 'Autor' no menu lateral. ✍️";
    }

    // Resumos de Artigos
    if(texto.includes("resumo") || texto.includes("artigo") || texto.includes("cientifico")){
        return "Temos resumos incríveis sobre literatura digital! Dê uma olhada na aba 'Resumos de Artigos' para expandir seus horizontes. 📄";
    }

    // Ajuda Geral
    if(texto.includes("ajuda") || texto.includes("o que voce faz")){
        return "Eu posso te dar dicas de leitura, explicar como usar a Área do Autor ou falar sobre as seções do site. O que quer explorar?";
    }   

    return "Não entendi o que você disse.";
}
// --- 1. CONTROLE DE NAVEGAÇÃO GERAL ---
const btnCriarCard = document.querySelector('.card-autor .btn-criar') || document.querySelector('button/* seletor do botão CRIAR do card */'); 
const viewAutor = document.getElementById('view-autor');
// (Adicione aqui o mapeamento das outras views se necessário, ex: viewInicio, viewLeitor)

// Exemplo: Quando clica em CRIAR no card do menu, abre a Área do Autor
if (btnCriarCard) {
    btnCriarCard.addEventListener('click', () => {
        // Lógica que você já usa para esconder as outras telas
        // document.getElementById('view-inicio').style.display = 'none';
        
        // Mostra a tela do Autor
        viewAutor.style.display = 'block'; 
    });
}


// --- 2. CONTROLE DO FORMULÁRIO DENTRO DA ÁREA DO AUTOR ---
const btnIniciarObra = document.getElementById('btn-iniciar-obra');
const btnCancelar = document.getElementById('btn-cancelar');
const estadoInicial = document.getElementById('autor-estado-inicial');
const estadoFormulario = document.getElementById('autor-estado-formulario');
const formNovoConto = document.getElementById('form-novo-conto');

// Abre o formulário substituindo o texto do bloco tracejado
if (btnIniciarObra) {
    btnIniciarObra.addEventListener('click', () => {
        estadoInicial.style.display = 'none';
        estadoFormulario.style.display = 'block';
    });
}

// Cancela o preenchimento e limpa os campos, voltando ao texto original
if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
        estadoFormulario.style.display = 'none';
        estadoInicial.style.display = 'block';
        formNovoConto.reset(); 
    });
}

// Envio do formulário
if (formNovoConto) {
    formNovoConto.addEventListener('submit', (e) => {
        e.preventDefault();
        
        alert('Obra enviada com sucesso para análise!');
        
        // Retorna ao estado inicial limpo
        estadoFormulario.style.display = 'none';
        estadoInicial.style.display = 'block';
        formNovoConto.reset();
    });
}
