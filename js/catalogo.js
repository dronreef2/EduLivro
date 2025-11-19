/**
 * Lógica do catálogo de materiais (index.html)
 */

// Estado da aplicação
let todosOsLivros = [];
let livrosFiltrados = [];
let configuracoes = null;

/**
 * Preenche filtros com opções dinâmicas baseadas nos dados
 */
function preencherFiltros() {
    const categorias = [...new Set(todosOsLivros.map(livro => livro.categoria))].sort();
    const niveis = [...new Set(todosOsLivros.map(livro => livro.nivel))].sort();

    const selectCategoria = document.getElementById('categoria');
    const selectNivel = document.getElementById('nivel');

    // Limpar opções existentes (exceto a primeira)
    while (selectCategoria.children.length > 1) {
        selectCategoria.removeChild(selectCategoria.lastChild);
    }
    while (selectNivel.children.length > 1) {
        selectNivel.removeChild(selectNivel.lastChild);
    }

    // Adicionar categorias
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        selectCategoria.appendChild(option);
    });

    // Adicionar níveis
    niveis.forEach(nivel => {
        const option = document.createElement('option');
        option.value = nivel;
        option.textContent = nivel;
        selectNivel.appendChild(option);
    });
}

/**
 * Aplica filtros com debounce configurável
 */
let debounceTimer;
function aplicarFiltros() {
    const tempoDebounce = configuracoes?.configuracoes?.tempo_debounce || 300;
    
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const termoBusca = document.getElementById('busca').value.toLowerCase().trim();
        const categoriaSelecionada = document.getElementById('categoria').value;
        const nivelSelecionado = document.getElementById('nivel').value;

        livrosFiltrados = todosOsLivros.filter(livro => {
            // Filtro por busca
            const matchBusca = !termoBusca || 
                livro.titulo.toLowerCase().includes(termoBusca) ||
                livro.autor.toLowerCase().includes(termoBusca) ||
                livro.descricao.toLowerCase().includes(termoBusca) ||
                (livro.tags && livro.tags.some(tag => tag.toLowerCase().includes(termoBusca)));

            // Filtro por categoria
            const matchCategoria = !categoriaSelecionada || livro.categoria === categoriaSelecionada;

            // Filtro por nível
            const matchNivel = !nivelSelecionado || livro.nivel === nivelSelecionado;

            return matchBusca && matchCategoria && matchNivel;
        });

        renderizarResultados();
    }, tempoDebounce);
}

/**
 * Limpa todos os filtros ativos
 */
function limparFiltros() {
    document.getElementById('busca').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('nivel').value = '';
    
    livrosFiltrados = [...todosOsLivros];
    renderizarResultados();
    
    // Focar no campo de busca após limpar
    document.getElementById('busca').focus();
}

/**
 * Cria HTML de um card de livro
 */
function criarCardLivro(livro) {
    const tagsHtml = livro.tags ? livro.tags.map(tag => 
        `<span class="tag">${escapeHtml(tag)}</span>`
    ).join('') : '';

    // Validar e sanitizar URL da capa
    const urlCapaSegura = validarUrl(livro.urlCapa);

    return `
        <div class="livro-card">
            <div class="livro-capa">
                ${urlCapaSegura ? 
                    `<img src="${escapeHtml(urlCapaSegura)}" alt="${escapeHtml(livro.titulo)}" 
                          style="width: 100%; height: 200px; object-fit: cover;" loading="lazy">` :
                    '<div style="display: flex; align-items: center; justify-content: center; height: 200px; color: #666;">📚 Sem capa</div>'
                }
            </div>
            <div class="livro-info">
                <h3 class="livro-titulo">${escapeHtml(livro.titulo)}</h3>
                <p class="livro-autor">por ${escapeHtml(livro.autor)}</p>
                <p class="livro-descricao">${escapeHtml(livro.descricao)}</p>
                <div class="livro-tags">${tagsHtml}</div>
                <div class="stats">
                    <span>📂 ${escapeHtml(livro.categoria)}</span>
                    <span>🎓 ${escapeHtml(livro.nivel)}</span>
                </div>
                <a href="livro.html?id=${encodeURIComponent(livro.id)}" class="btn-ver">
                    Ver Material
                </a>
            </div>
        </div>
    `;
}

/**
 * Renderiza resultados no catálogo
 */
function renderizarResultados() {
    const container = document.getElementById('resultados');
    const loading = document.getElementById('loading');
    const contadorResultados = document.getElementById('contador-resultados');

    if (livrosFiltrados.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <p style="font-size: 1.2rem; color: #666; margin-bottom: 1rem;">
                    Nenhum material encontrado com os filtros aplicados.
                </p>
                <p style="color: #888;">
                    Tente remover alguns filtros ou limpar a busca.
                </p>
            </div>
        `;
        container.style.display = 'grid';
        loading.style.display = 'none';
        
        // Atualizar contador
        if (contadorResultados) {
            contadorResultados.textContent = `0 materiais encontrados`;
            contadorResultados.setAttribute('aria-live', 'polite');
        }
        return;
    }

    container.innerHTML = livrosFiltrados.map(livro => criarCardLivro(livro)).join('');
    container.style.display = 'grid';
    loading.style.display = 'none';
    
    // Atualizar contador de resultados
    if (contadorResultados) {
        const totalMateriais = todosOsLivros.length;
        const materiaisEncontrados = livrosFiltrados.length;
        
        if (materiaisEncontrados === totalMateriais) {
            contadorResultados.textContent = `${totalMateriais} ${totalMateriais === 1 ? 'material' : 'materiais'} no catálogo`;
        } else {
            contadorResultados.textContent = `${materiaisEncontrados} de ${totalMateriais} ${totalMateriais === 1 ? 'material' : 'materiais'}`;
        }
        contadorResultados.setAttribute('aria-live', 'polite');
    }
}

/**
 * Carrega dados do catálogo
 */
async function carregarCatalogo() {
    try {
        const data = await carregarJson('data/database.json');
        
        if (!data.livros || !Array.isArray(data.livros)) {
            throw new Error('Formato inválido de dados: campo "livros" não encontrado');
        }

        // Validar todos os livros
        const livrosValidos = data.livros.filter(livro => {
            if (!validarLivro(livro)) {
                console.warn('Livro inválido encontrado e ignorado:', livro);
                return false;
            }
            return true;
        });

        if (livrosValidos.length === 0) {
            throw new Error('Nenhum livro válido encontrado no catálogo');
        }

        todosOsLivros = livrosValidos;
        livrosFiltrados = [...todosOsLivros];
        
        console.log(`✓ Carregados ${todosOsLivros.length} materiais`);
        
        // Preencher filtros e renderizar
        preencherFiltros();
        renderizarResultados();
        
    } catch (error) {
        console.error('Erro ao carregar catálogo:', error);
        mostrarErro(
            `Erro ao carregar catálogo: ${error.message}. Tente recarregar a página.`,
            'loading',
            false
        );
    }
}

/**
 * Carrega configurações do site
 */
async function carregarConfiguracao() {
    try {
        const config = await carregarJson('data/config.json');
        configuracoes = config;
        
        // Aplicar tema se configurado
        if (config.tema) {
            aplicarTema(config.tema);
        }
        
        console.log('✓ Configurações carregadas');
        return config;
        
    } catch (error) {
        console.warn('Usando configuração padrão:', error);
        configuracoes = {
            titulo: "EduLivro - Portal Pedagógico Gratuito",
            descricao: "Portal pedagógico gratuito para divulgação de material educacional no Brasil",
            versao: "1.1.0",
            configuracoes: {
                tempo_debounce: 300,
                mostrar_estatisticas: true
            }
        };
        return configuracoes;
    }
}

/**
 * Aplica tema customizado via CSS custom properties
 */
function aplicarTema(tema) {
    if (!tema) return;
    
    const root = document.documentElement;
    
    if (tema.cor_primaria) {
        root.style.setProperty('--cor-primaria', tema.cor_primaria);
    }
    if (tema.cor_secundaria) {
        root.style.setProperty('--cor-secundaria', tema.cor_secundaria);
    }
    if (tema.cor_acento) {
        root.style.setProperty('--cor-acento', tema.cor_acento);
    }
    if (tema.fonte_principal) {
        root.style.setProperty('--fonte-principal', tema.fonte_principal);
    }
}

/**
 * Configura event listeners
 */
function configurarEventos() {
    document.getElementById('busca').addEventListener('input', aplicarFiltros);
    document.getElementById('categoria').addEventListener('change', aplicarFiltros);
    document.getElementById('nivel').addEventListener('change', aplicarFiltros);
    
    const btnLimpar = document.getElementById('btn-limpar-filtros');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', limparFiltros);
    }
}

/**
 * Inicializa a aplicação do catálogo
 */
async function inicializarCatalogo() {
    try {
        // Configurar ARIA para loading
        const loading = document.getElementById('loading');
        loading.setAttribute('role', 'status');
        loading.setAttribute('aria-live', 'polite');
        loading.setAttribute('aria-busy', 'true');
        
        // Configurar event listeners
        configurarEventos();
        
        // Carregar dados
        await carregarConfiguracao();
        await carregarCatalogo();
        
        // Remover aria-busy
        loading.setAttribute('aria-busy', 'false');
        
    } catch (error) {
        console.error('Erro na inicialização do catálogo:', error);
        mostrarErro(
            `Erro ao inicializar aplicação: ${error.message}`,
            'loading',
            false
        );
    }
}

// Iniciar quando a página carregar
document.addEventListener('DOMContentLoaded', inicializarCatalogo);
