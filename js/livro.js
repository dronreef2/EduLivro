/**
 * Lógica da página de detalhes do material (livro.html)
 */

let materialAtual = null;

/**
 * Carrega material pelo ID
 */
async function carregarMaterial(id) {
    try {
        const data = await carregarJson('data/database.json');
        
        if (!data.livros || !Array.isArray(data.livros)) {
            throw new Error('Formato inválido de dados: campo "livros" não encontrado');
        }

        const idNumerico = parseId(id);
        if (idNumerico === null) {
            throw new Error('ID do material inválido. Verifique o link e tente novamente.');
        }

        const material = data.livros.find(livro => livro.id === idNumerico);
        
        if (!material) {
            throw new Error('Material não encontrado. O ID pode estar incorreto ou o material foi removido.');
        }

        if (!validarLivro(material)) {
            throw new Error('Material encontrado, mas com dados incompletos ou inválidos.');
        }

        return material;
        
    } catch (error) {
        console.error('Erro ao carregar material:', error);
        throw error;
    }
}

/**
 * Renderiza material na página
 */
function renderizarMaterial(material) {
    materialAtual = material;
    
    // Atualizar título da página
    document.title = `${material.titulo} - EduLivro`;
    
    // Hero section
    document.getElementById('material-titulo').textContent = material.titulo;
    document.getElementById('material-descricao').textContent = 'Portal pedagógico gratuito para o Brasil';

    // Header do material
    document.getElementById('titulo').textContent = material.titulo;
    document.getElementById('autor').textContent = `por ${material.autor}`;
    document.getElementById('descricao').textContent = material.descricao;
    
    // Capa com validação de URL
    const capa = document.getElementById('material-capa');
    const urlCapaSegura = validarUrl(material.urlCapa);
    
    if (urlCapaSegura) {
        capa.src = urlCapaSegura;
        capa.alt = `Capa de ${material.titulo}`;
        capa.style.display = 'block';
    } else {
        // Mostrar fallback textual em vez de apenas esconder
        const capaContainer = capa.parentElement;
        capaContainer.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; 
                        height: 400px; background: #f0f0f0; border-radius: 8px; color: #666;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📚</div>
                <div>Capa não disponível</div>
            </div>
        `;
    }

    // Tags
    const tagsContainer = document.getElementById('tags');
    tagsContainer.innerHTML = '';
    if (material.tags && material.tags.length > 0) {
        material.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });
    }

    // Modelo 3D com validação
    const modelViewerContainer = document.getElementById('model-viewer-container');
    const modelViewer = document.getElementById('model-viewer');
    
    if (material.urlModelo3D) {
        const urlModeloSegura = validarUrl(material.urlModelo3D);
        
        if (urlModeloSegura) {
            modelViewer.src = urlModeloSegura;
            modelViewerContainer.classList.add('active');
            modelViewerContainer.style.display = 'block';
        } else {
            console.warn('URL de modelo 3D inválida:', material.urlModelo3D);
            modelViewerContainer.style.display = 'none';
        }
    } else {
        modelViewerContainer.style.display = 'none';
    }

    // Detalhes
    document.getElementById('detalhes-categoria').textContent = material.categoria || 'Não informado';
    document.getElementById('detalhes-nivel').textContent = material.nivel || 'Não informado';
    document.getElementById('detalhes-paginas').textContent = material.paginas || 'Não informado';
    document.getElementById('detalhes-ano').textContent = material.ano || 'Não informado';
    document.getElementById('detalhes-formato').textContent = material.formato || 'PDF';
    document.getElementById('detalhes-tamanho').textContent = material.tamanho || 'Não informado';
    document.getElementById('detalhes-idioma').textContent = material.idioma || 'Português';
    document.getElementById('detalhes-licenca').textContent = material.licenca || 'CC BY-SA 4.0';

    // Botão de download
    const btnDownload = document.getElementById('btn-download');
    
    if (material.urlDownload) {
        const urlDownloadSegura = validarUrl(material.urlDownload);
        
        if (urlDownloadSegura) {
            btnDownload.href = urlDownloadSegura;
            btnDownload.textContent = '📄 Baixar Material';
            btnDownload.style.opacity = '1';
            btnDownload.style.cursor = 'pointer';
        } else {
            desabilitarBotaoDownload(btnDownload);
        }
    } else {
        desabilitarBotaoDownload(btnDownload);
    }

    // Esconder loading e mostrar conteúdo
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    document.getElementById('material-content').style.display = 'block';
}

/**
 * Desabilita o botão de download quando não há URL
 */
function desabilitarBotaoDownload(btnDownload) {
    btnDownload.href = '#';
    btnDownload.textContent = '📄 Download não disponível';
    btnDownload.style.opacity = '0.5';
    btnDownload.style.cursor = 'not-allowed';
    btnDownload.addEventListener('click', (e) => {
        e.preventDefault();
        alert('O download deste material ainda não está disponível.');
    });
}

/**
 * Compartilha o material usando Web Share API ou clipboard
 */
function compartilharMaterial(material) {
    const dadosCompartilhamento = {
        title: material.titulo,
        text: material.descricao,
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(dadosCompartilhamento)
            .catch(error => {
                // Usuário cancelou ou erro - tentar fallback
                if (error.name !== 'AbortError') {
                    copiarLinkParaClipboard();
                }
            });
    } else {
        copiarLinkParaClipboard();
    }
}

/**
 * Copia link para clipboard como fallback
 */
function copiarLinkParaClipboard() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                alert('Link copiado para a área de transferência!');
            })
            .catch(() => {
                mostrarLinkParaCopiar();
            });
    } else {
        mostrarLinkParaCopiar();
    }
}

/**
 * Mostra prompt com link para copiar manualmente
 */
function mostrarLinkParaCopiar() {
    prompt('Copie este link:', window.location.href);
}

/**
 * Configura event listeners da página
 */
function configurarEventos() {
    const btnCompartilhar = document.getElementById('btn-compartilhar');
    if (btnCompartilhar) {
        btnCompartilhar.addEventListener('click', () => {
            if (materialAtual) {
                compartilharMaterial(materialAtual);
            }
        });
    }
}

/**
 * Inicializa página de detalhes do material
 */
async function inicializarPaginaLivro() {
    try {
        // Configurar ARIA para loading
        const loading = document.getElementById('loading');
        loading.setAttribute('role', 'status');
        loading.setAttribute('aria-live', 'polite');
        loading.setAttribute('aria-busy', 'true');
        
        // Obter ID da URL
        const id = obterParametroURL('id');
        
        if (!id) {
            throw new Error('ID do material não especificado na URL. Verifique o link ou volte ao catálogo.');
        }

        // Carregar e renderizar material
        const material = await carregarMaterial(id);
        renderizarMaterial(material);
        
        // Configurar eventos
        configurarEventos();
        
        // Remover aria-busy
        loading.setAttribute('aria-busy', 'false');

    } catch (error) {
        console.error('Erro na inicialização da página:', error);
        document.getElementById('loading').style.display = 'none';
        
        const errorElement = document.getElementById('error');
        const errorMessage = document.getElementById('error-message');
        
        errorMessage.textContent = error.message;
        errorElement.innerHTML = `
            <h3>Erro ao carregar material</h3>
            <p>${escapeHtml(error.message)}</p>
            <p><a href="index.html" class="btn-voltar">Voltar ao Catálogo</a></p>
        `;
        errorElement.style.display = 'block';
        
        // Melhorar acessibilidade
        errorElement.setAttribute('role', 'alert');
        errorElement.setAttribute('tabindex', '-1');
        errorElement.focus();
    }
}

// Iniciar quando a página carregar
document.addEventListener('DOMContentLoaded', inicializarPaginaLivro);
