/**
 * Utilitários compartilhados do EduLivro
 * Funções reutilizáveis para segurança, carregamento de dados e manipulação de URL
 */

/**
 * Escapa caracteres HTML para prevenir XSS
 * @param {string} texto - Texto a ser escapado
 * @returns {string} Texto escapado e seguro para HTML
 */
function escapeHtml(texto) {
    if (!texto) return '';
    const mapa = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(texto).replace(/[&<>"']/g, function(m) { return mapa[m]; });
}

/**
 * Valida e sanitiza URLs para prevenir protocolos perigosos
 * @param {string} url - URL a ser validada
 * @returns {string|null} URL segura ou null se inválida
 */
function validarUrl(url) {
    if (!url || typeof url !== 'string') return null;
    
    // Remove espaços em branco
    url = url.trim();
    
    // Aceita apenas http, https ou URLs relativas
    const urlPattern = /^(https?:\/\/|\.\/|\/)/i;
    if (!urlPattern.test(url)) {
        console.warn('URL com protocolo inválido bloqueada:', url);
        return null;
    }
    
    // Bloqueia protocolos perigosos explicitamente
    const protocolosPerigrosos = /^(javascript|data|vbscript|file):/i;
    if (protocolosPerigrosos.test(url)) {
        console.warn('URL com protocolo perigoso bloqueada:', url);
        return null;
    }
    
    return url;
}

/**
 * Carrega arquivo JSON de forma assíncrona
 * @param {string} caminho - Caminho do arquivo JSON
 * @returns {Promise<Object>} Dados JSON parseados
 */
async function carregarJson(caminho) {
    try {
        const response = await fetch(caminho);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status} ao carregar ${caminho}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.warn(`Tipo de conteúdo inesperado para ${caminho}: ${contentType}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error(`Erro ao carregar JSON de ${caminho}:`, error);
        throw error;
    }
}

/**
 * Obtém parâmetro da URL
 * @param {string} nome - Nome do parâmetro
 * @returns {string|null} Valor do parâmetro ou null se não existir
 */
function obterParametroURL(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

/**
 * Mostra mensagem de erro em um elemento
 * @param {string} mensagem - Mensagem de erro
 * @param {string} elementoId - ID do elemento onde exibir o erro
 * @param {boolean} incluirLinkCatalogo - Se deve incluir link para o catálogo
 */
function mostrarErro(mensagem, elementoId, incluirLinkCatalogo = false) {
    const elemento = document.getElementById(elementoId);
    if (!elemento) {
        console.error(`Elemento ${elementoId} não encontrado para mostrar erro`);
        return;
    }
    
    elemento.innerHTML = `
        <h3>Erro</h3>
        <p>${escapeHtml(mensagem)}</p>
        ${incluirLinkCatalogo ? '<p><a href="index.html" class="btn-voltar">Voltar ao Catálogo</a></p>' : ''}
    `;
    elemento.style.display = 'block';
    
    // Melhorar acessibilidade movendo foco para o erro
    elemento.setAttribute('tabindex', '-1');
    elemento.focus();
}

/**
 * Valida estrutura básica de um livro/material
 * @param {Object} livro - Objeto livro a ser validado
 * @returns {boolean} true se válido, false caso contrário
 */
function validarLivro(livro) {
    if (!livro || typeof livro !== 'object') return false;
    
    const camposObrigatorios = ['id', 'titulo', 'autor', 'descricao', 'categoria', 'nivel', 'urlCapa'];
    
    for (const campo of camposObrigatorios) {
        if (!livro.hasOwnProperty(campo)) {
            console.warn(`Livro sem campo obrigatório '${campo}':`, livro);
            return false;
        }
    }
    
    // Validar tipos básicos
    if (typeof livro.id !== 'number' || livro.id <= 0) {
        console.warn('ID de livro inválido:', livro.id);
        return false;
    }
    
    if (typeof livro.titulo !== 'string' || livro.titulo.trim() === '') {
        console.warn('Título de livro inválido:', livro.titulo);
        return false;
    }
    
    return true;
}

/**
 * Formata número como ID (com validação)
 * @param {string|number} valor - Valor a ser convertido
 * @returns {number|null} ID numérico ou null se inválido
 */
function parseId(valor) {
    const id = parseInt(valor, 10);
    if (isNaN(id) || id <= 0) {
        return null;
    }
    return id;
}
