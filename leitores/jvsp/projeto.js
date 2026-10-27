/*
const vavItems = document.querySelectorAll('.nav-item[data-target]');
const contentViews = document.querySelectorAll('content-view');

navItems.forEach(item => {
    item.addeventListener('click',() =>{

    }
}); 
*/
window.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        alert('Acesso restrito! Por favor, faça login primeiro.');
        window.location.href = '../login.html'; // Volta para a raiz onde está o login
    } else {
        // Inicializa com o primeiro kit padrão ao carregar
        selecionarKit('reading_universe');
    }
});

// SISTEMA DE KITS TEMÁTICOS E BANNER DINÂMICO
const themeKits = {
  reading_universe: {
    avatarType: 'icon',
    avatarIcon: 'fa-solid fa-galaxy',
    avatarBg: 'linear-gradient(135deg, #8a2be2 0%, #ff2a85 100%)',
    name: 'Reading Universe',
    subtitle: 'Universo Literário',
    bannerImg: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop',
    bannerTitle: 'Dicas de Leitura Cósmicas',
    bannerBadge: 'RECOMENDADOS DO UNIVERSO',
    bannerDesc: 'Explore a imensidão de livros catalogados na comunidade Reading Universe.'
  },
  explorador_cosmico: {
    avatarType: 'icon',
    avatarIcon: 'fa-solid fa-user-astronaut',
    avatarBg: 'linear-gradient(135deg, #06b6d4 0%, #8a2be2 100%)',
    name: 'Leitor Lumina',
    subtitle: 'Explorador Cósmico',
    bannerImg: 'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?q=80&w=1200&auto=format&fit=crop',
    bannerTitle: 'Navegação pelas Estrelas',
    bannerBadge: 'EXPEDIÇÃO LITERÁRIA',
    bannerDesc: 'Desbrave histórias fascinantes além do horizonte do conhecimento humano.'
  },
  biblioteca_classica: {
    avatarType: 'icon',
    avatarIcon: 'fa-solid fa-book-bookmark',
    avatarBg: 'linear-gradient(135deg, #d97706 0%, #8a2be2 100%)',
    name: 'Arquivista Noturno',
    subtitle: 'Mestre dos Clássicos',
    bannerImg: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop',
    bannerTitle: 'Relíquias da Literatura',
    bannerBadge: 'ACERVO CLÁSSICO',
    bannerDesc: 'Mergulhe em edições históricas, obras raras e grandes filósofos.'
  },
  romantico: {
    avatarType: 'icon',
    avatarIcon: 'fa-solid fa-heart',
    avatarBg: 'linear-gradient(135deg, #ff2a85 0%, #dc2626 100%)',
    name: 'Líria Poética',
    subtitle: 'Devoradora de Romances',
    bannerImg: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?q=80&w=1200&auto=format&fit=crop',
    bannerTitle: 'Histórias de Amor & Paixão',
    bannerBadge: 'SELEÇÃO APAIXONANTE',
    bannerDesc: 'Descubra narrativas emocionantes e romances arrebentadores.'
  },
  terror: {
    avatarType: 'icon',
    avatarIcon: 'fa-solid fa-skull',
    avatarBg: 'linear-gradient(135deg, #e11d48 0%, #8a2be2 100%)',
    name: 'Sombra Literária',
    subtitle: 'Mestre do Horror',
    bannerImg: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop',
    bannerTitle: 'Obras Obscuras & Terror',
    bannerBadge: 'MISTÉRIOS DA NOITE',
    bannerDesc: 'Enfrente os contos mais sombrios e envolventes da literatura gótica.'
  }
};

function selecionarKit(kitKey) {
  const kit = themeKits[kitKey];
  if (!kit) return;

  const avatarImg = document.getElementById('user-avatar-img');
  const avatarFallback = document.getElementById('user-avatar-fallback');
  const avatarIcon = document.getElementById('user-avatar-icon');
  const nameTarget = document.getElementById('user-name-target');
  const subTarget = document.getElementById('user-sub-target');
  const bannerCard = document.getElementById('main-banner-card');
  const bannerTitle = document.getElementById('banner-title');
  const bannerBadge = document.getElementById('banner-badge');
  const bannerDesc = document.getElementById('banner-desc');

  // Atualiza Avatar e ícone/fundo
  if (kit.avatarType === 'image') {
      avatarImg.src = kit.avatarUrl;
      avatarImg.style.display = 'block';
      avatarFallback.style.display = 'none';
  } else {
      avatarImg.style.display = 'none';
      avatarFallback.style.display = 'flex';
      avatarFallback.style.background = kit.avatarBg;
      avatarIcon.className = kit.avatarIcon;
  }

  // Atualiza Textos do Perfil
  if (nameTarget) nameTarget.textContent = kit.name;
  if (subTarget) subTarget.textContent = kit.subtitle;

  // Atualiza o Banner Central
  if (bannerCard) {
      bannerCard.style.backgroundImage = `url('${kit.bannerImg}')`;
  }
  if (bannerTitle) bannerTitle.textContent = kit.bannerTitle;
  if (bannerBadge) bannerBadge.textContent = kit.bannerBadge;
  if (bannerDesc) bannerDesc.textContent = kit.bannerDesc;

  // Destaca o botão ativo no topo
  document.querySelectorAll('.kit-selector-btn').forEach(btn => {
      btn.style.borderColor = '#231b42';
      btn.style.background = '#130f26';
  });
  const activeBtn = document.getElementById(`btn-${kitKey}`);
  if (activeBtn) {
      activeBtn.style.borderColor = '#9d4edd';
      activeBtn.style.background = 'rgba(138, 43, 226, 0.25)';
  }
}

// 1. CONTROLE DE NAVEGAÇÃO GERAL
const navItems = document.querySelectorAll('.nav-item[data-target]');
const contentViews = document.querySelectorAll('.content-view');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        contentViews.forEach(view => view.classList.remove('active-view'));
        
        const targetId = item.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        if(targetElement) {
            targetElement.classList.add('active-view');
        }
    });
});

// 2. INTERAÇÃO DE CLIQUE NOS LIVROS (MODAL DETALHADO)
const modal = document.getElementById('bookModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const bookCards = document.querySelectorAll('.book-card[data-synopsis]');

bookCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.book-title').innerText;
        const cover = card.querySelector('.book-cover').innerText;
        const synopsis = card.getAttribute('data-synopsis');

        document.getElementById('modalTitle').innerText = title;
        document.getElementById('modalCover').innerText = cover;
        document.getElementById('modalSynopsis').innerText = synopsis;

        // Faz o botão "Começar Leitura" redirecionar para a página do e-book passando o título
        const btnLeitura = document.getElementById('btnComecarLeitura');
        if (btnLeitura) {
            btnLeitura.onclick = function() {
                window.location.href = `leitor-livro.html?livro=${encodeURIComponent(title)}`;
            };
        }

        modal.classList.add('modal-open');
    });
});

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => modal.classList.remove('modal-open'));
}
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('modal-open');
    });
}

// ANIMAÇÃO DE ABRIR E FECHAR DO CHAT
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

    mensagens.innerHTML += `<div class="mensagem usuario"><b>Você:</b> ${texto}</div>`;

    let resposta = responder(texto);

    setTimeout(() => {
        mensagens.innerHTML += `<div class="mensagem bot"><b>Bot:</b> ${resposta}</div>`;
        mensagens.scrollTop = mensagens.scrollHeight;
    }, 400);        
    
    entrada.value = "";
    mensagens.scrollTop = mensagens.scrollHeight;
}

function responder(texto){
    texto = texto.toLowerCase();

    if(texto.includes("oi") || texto.includes("olá") || texto.includes("ola")){
        return "Olá! Eu sou o Lumina Bot. Como posso ajudar na sua leitura hoje? 📚";
    }

    if(texto.includes("tudo bem") || texto.includes("como voce esta")){
        return "Estou funcionando perfeitamente! Pronto para falarmos sobre livros. 😄";
    }

    if(texto.includes("seu nome") || texto.includes("quem é voce")){
        return "Eu sou o Lumina Bot, o assistente virtual da plataforma Lumina! 🤖";
    }

    if(texto.includes("dica") || texto.includes("leitura") || texto.includes("recomenda")){
        return "No momento, recomendo fortemente os nossos destaques: 'Orgulho e Preconceito' para quem ama clássicos, ou 'A Garota no Trem' se você curte um mistério! 👁️🚂";
    }

    if(texto.includes("autor") || texto.includes("escrever") || texto.includes("publicar")){
        return "Na Área do Autor, você poderá criar seus próprios manuscritos e gerenciar suas publicações! Basta clicar em 'Autor' no menu lateral. ✍️";
    }

    if(texto.includes("resumo") || texto.includes("artigo") || texto.includes("cientifico")){
        return "Temos resumos incríveis sobre literatura digital! Dê uma olhada na aba 'Resumos de Artigos' para expandir seus horizontes. 📄";
    }

    if(texto.includes("ajuda") || texto.includes("o que voce faz")){
        return "Eu posso te dar dicas de leitura, explicar como usar a Área do Autor ou falar sobre as seções do site. O que quer explorar?";
    }   

    return "Não entendi o que você disse.";
}

// --- CONTROLE DO FORMULÁRIO DENTRO DA ÁREA DO AUTOR ---
const btnIniciarObra = document.getElementById('btn-iniciar-obra');
const btnCancelar = document.getElementById('btn-cancelar');
const estadoInicial = document.getElementById('autor-estado-inicial');
const estadoFormulario = document.getElementById('autor-estado-formulario');
const formNovoConto = document.getElementById('form-novo-conto');

if (btnIniciarObra) {
    btnIniciarObra.addEventListener('click', () => {
        estadoInicial.style.display = 'none';
        estadoFormulario.style.display = 'block';
    });
}

if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
        estadoFormulario.style.display = 'none';
        estadoInicial.style.display = 'block';
        formNovoConto.reset(); 
    });
}

if (formNovoConto) {
    formNovoConto.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Obra enviada com sucesso para análise!');
        estadoFormulario.style.display = 'none';
        estadoInicial.style.display = 'block';
        formNovoConto.reset();
    });
}
