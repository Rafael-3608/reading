window.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        alert('Acesso restrito! Por favor, faça login primeiro.');
        window.location.href = '../login.html'; 
    } else {
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

    if (nameTarget) nameTarget.textContent = kit.name;
    if (subTarget) subTarget.textContent = kit.subtitle;
    if (bannerCard) bannerCard.style.backgroundImage = `url('${kit.bannerImg}')`;
    if (bannerTitle) bannerTitle.textContent = kit.bannerTitle;
    if (bannerBadge) bannerBadge.textContent = kit.bannerBadge;
    if (bannerDesc) bannerDesc.textContent = kit.bannerDesc;

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

// --- FUNÇÕES DE ALTERAÇÃO DE BANNER E AVATAR ---
function abrirModalImagem() {
    const modal = document.getElementById('modalEscolhaImagem');
    if (modal) modal.classList.add('modal-open');
}

function fecharModalImagem() {
    const modal = document.getElementById('modalEscolhaImagem');
    if (modal) modal.classList.remove('modal-open');
}

function escolherNovoBanner(imageUrl) {
    const bannerElement = document.getElementById('main-banner-card');
    if (bannerElement && imageUrl) {
        bannerElement.style.backgroundImage = `url('${imageUrl}')`;
        fecharModalImagem();
    }
}

function abrirModalAvatar() {
    const modal = document.getElementById('modalEscolhaAvatar');
    if (modal) modal.classList.add('modal-open');
}

function fecharModalAvatar() {
    const modal = document.getElementById('modalEscolhaAvatar');
    if (modal) modal.classList.remove('modal-open');
}

function escolherNovoAvatar(imageUrl) {
    const avatarImg = document.getElementById('user-avatar-img');
    const avatarFallback = document.getElementById('user-avatar-fallback');

    if (avatarImg && imageUrl) {
        avatarImg.src = imageUrl;
        avatarImg.style.display = 'block';
        if (avatarFallback) avatarFallback.style.display = 'none';
        fecharModalAvatar();
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
        if (targetElement) targetElement.classList.add('active-view');
    });
});

// 2. INTERAÇÃO DE CLIQUE NOS LIVROS
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

        const btnLeitura = document.getElementById('btnComecarLeitura');
        if (btnLeitura) {
            btnLeitura.onclick = function () {
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

// --- INTEGRIDADE INTELIGENTE DO LUMINA BOT ---

async function enviar() {
    let entrada = document.getElementById("entrada");
    let mensagens = document.getElementById("mensagens");

    let texto = entrada.value.trim();
    if (texto === "") return;

    mensagens.innerHTML += `<div class="mensagem usuario"><b>Você:</b> ${texto}</div>`;
    entrada.value = "";
    mensagens.scrollTop = mensagens.scrollHeight;

    const loadingId = "loading-" + Date.now();
    mensagens.innerHTML += `<div class="mensagem bot" id="${loadingId}"><b>Lumina Bot:</b> <i>Consultando os alfarrábios estelares...</i></div>`;
    mensagens.scrollTop = mensagens.scrollHeight;

    setTimeout(() => {
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) loadingElement.remove();

        let respostaIA = gerarRespostaLumina(texto);
        mensagens.innerHTML += `<div class="mensagem bot"><b>Lumina Bot:</b> ${respostaIA}</div>`;
        mensagens.scrollTop = mensagens.scrollHeight;
    }, 1000);
}

function gerarRespostaLumina(pergunta) {
    const texto = pergunta.toLowerCase();

    if (texto.includes('olá') || texto.includes('ola') || texto.includes('oi') || texto.includes('hey')) {
        return "Olá, explorador das estrelas! 🌌 Como posso te ajudar na sua jornada literária hoje?";
    }
    
    if (texto.includes('livro') || texto.includes('recomenda') || texto.includes('indica') || texto.includes('ler')) {
        return "O universo literário é vasto! Recomendo explorar nossa seção de clássicos ou se aventurar pelas obras de ficção científica e romances disponíveis no topo da plataforma. Tem algum gênero específico que te fascina?";
    }

    if (texto.includes('autor') || texto.includes('escrever') || texto.includes('publicar') || texto.includes('história') || texto.includes('conto')) {
        return "A Área do Autor é o seu santuário criativo! ✍️ Você pode iniciar uma nova obra clicando no painel dedicado a escritores e enviar seus manuscritos para a comunidade ler.";
    }

    if (texto.includes('site') || texto.includes('plataforma') || texto.includes('reading universe') || texto.includes('funciona')) {
        return "O **Reading Universe** foi co-desenvolvido para conectar leitores e escritores apaixonados por literatura. Aqui você pode gerenciar seus kits temáticos, explorar catálogos imersivos e interagir com outros leitores!";
    }

    if (texto.includes('obrigado') || texto.includes('valeu') || texto.includes('brigado')) {
        return "Por nada! Estou sempre por aqui para iluminar suas leituras. Boa jornada cósmica! ✨";
    }

    return `Que pergunta instigante sobre "${pergunta}"! Como assistente do Reading Universe, meu foco é guiar sua jornada entre livros, autores e clássicos. Explore nossas prateleiras virtuais ou me pergunte sobre dicas de leitura e escrita! 📚🚀`;
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
        
        // Captura os inputs do formulário de rascunho/nova obra
        const inputs = formNovoConto.querySelectorAll('input, select, textarea');
        
        const dadosObraTemp = {
            titulo: inputs[0].value,
            autor: inputs[1].value,
            categoria: inputs[2].value,
            descricao: inputs[3].value
        };

        // Salva temporariamente no localStorage para a página de escrita resgatar
        localStorage.setItem('obra_em_criacao', JSON.stringify(dadosObraTemp));

        // Redireciona para a nova tela de rascunho do livro
        // (Confirme se o caminho relativo está correto dependendo de onde seu 'projeto.js' está salvo)
        window.location.href = 'escrever-obras.html'; 
    });
}