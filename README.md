# EduLivro - Portal Pedagógico Gratuito

[![Status do Projeto](https://img.shields.io/badge/status-ativo-brightgreen.svg)](https://github.com/dronreef2/EduLivro)
[![Versão](https://img.shields.io/badge/versão-1.1.0-blue.svg)](#)
[![Licença](https://img.shields.io/badge/licença-CC%20BY--SA%204.0-lightgrey.svg)](#licença)
[![Português](https://img.shields.io/badge/idioma-Português-green.svg)](#)

## 🎯 Sobre o Projeto

O **EduLivro** é um portal pedagógico 100% gratuito e open-source dedicado à divulgação de materiais educacionais de qualidade no Brasil. Nossa missão é democratizar o acesso à educação, oferecendo um catálogo completo e organizado de recursos educacionais sem custos ou restrições de acesso.

### 📊 Características do Projeto

- **100% Gratuito**: Todos os materiais são de livre acesso
- **Open Source**: Código fonte aberto e modificável
- **Totalmente Portátil**: Não depende de serviços externos ou bancos de dados
- **Responsivo**: Funciona perfeitamente em dispositivos móveis
- **Seguro**: Proteção XSS e validação de dados implementada

## ✨ Funcionalidades

### 🔍 **Busca e Filtros Avançados**
- Busca por título, autor, descrição e tags
- Filtros por categoria e nível de complexidade
- Sistema de debounce para performance otimizada
- Filtros em tempo real sem recarregamento de página

### 📱 **Interface Responsiva**
- Design adaptativo para desktop, tablet e mobile
- Layout em grid responsivo que se ajusta automaticamente
- Navegação otimizada para touch screens
- Cards de materiais com hover effects

### 🎓 **Catálogo Organizado**
- 10+ materiais educacionais em diferentes áreas
- Categorias: Tecnologia, História, Matemática, Ciências, Literatura, Direito, Educação e Administração
- Níveis: Iniciante, Intermediário e Avançado
- Tags temáticas para facilitar a descoberta

### 📐 **Visualização 3D (model-viewer)**
- Suporte para modelos 3D de materiais
- Visualização interativa com controles de câmera
- Auto-rotação e efeitos de sombra
- Fallback automático para materiais sem modelo 3D

### 🔒 **Segurança e Validação**
- Proteção contra ataques XSS
- Sanitização automática de dados
- Validação de estrutura JSON
- Encoding seguro de URLs
- Escape HTML para prevenir injection

## 🚀 Como Usar

### **Acesso Direto**
1. Acesse `index.html` no seu navegador
2. Use os filtros para encontrar materiais específicos
3. Clique em "Ver Material" para acessar os detalhes
4. Utilize o botão "Voltar ao Início" para retornar ao catálogo

### **Hospedagem Local**
```bash
# Iniciar servidor HTTP simples (Python)
python -m http.server 8000

# Ou com Node.js
npx serve .

# Acesse: http://localhost:8000
```

## 📦 Como Hospedar

### **GitHub Pages (Recomendado)**
1. Faça push deste repositório para seu GitHub
2. Vá em Settings → Pages
3. Selecione "Deploy from a branch" → "main"
4. Seu site estará disponível em: `https://seuusuario.github.io/EduLivro`

### **Netlify (Alternativa)**
1. Faça upload da pasta completa do projeto
2. O Netlify detectará automaticamente que é um site estático
3. Site publicado automaticamente com URL única

### **Qualquer Servidor Web**
- Faça upload de todos os arquivos para seu servidor
- Garanta que `index.html` esteja na raiz
- Configure roteamento para servir `index.html` para todas as rotas

## 📖 Como Adicionar Novos Materiais

### **1. Edite o arquivo `database.json`**
```json
{
  "id": 11,
  "titulo": "Seu Novo Material",
  "autor": "Seu Nome",
  "descricao": "Descrição do material...",
  "categoria": "Sua Categoria",
  "nivel": "Iniciante",
  "urlCapa": "URL_DA_SUA_CAPA",
  "tags": ["tag1", "tag2", "tag3"],
  "urlModelo3D": "URL_DO_MODELO_3D_OPCIONAL",
  "paginas": 100,
  "ano": 2024,
  "isbn": "978-00-00000-00-0",
  "formato": "PDF",
  "tamanho": "15.2 MB",
  "idioma": "Português",
  "licenca": "CC BY-SA 4.0"
}
```

### **2. Campos Obrigatórios**
- `id`: Número único
- `titulo`: Título do material
- `autor`: Nome do autor
- `descricao`: Descrição detalhada
- `categoria`: Categoria do material
- `nivel`: Iniciante, Intermediário ou Avançado
- `urlCapa`: URL da imagem de capa

### **3. Campos Opcionais**
- `urlModelo3D`: Para visualização 3D
- `paginas`: Número de páginas
- `ano`: Ano de publicação
- `isbn`: Código ISBN
- `formato`: Tipo de arquivo
- `tamanho`: Tamanho do arquivo
- `idioma`: Idioma do material
- `licenca`: Tipo de licença

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **HTML5 Semântico**: Estrutura moderna e acessível
- **MVP.css**: Framework CSS leve e responsivo
- **JavaScript ES6+**: Código moderno sem dependências
- **Fetch API**: Carregamento assíncrono de dados
- **Web Components**: model-viewer do Google para 3D

### **Dados**
- **JSON**: Armazenamento de dados estruturados
- **Local Storage**: Cache de configurações do usuário
- **URL Parameters**: Navegação e filtros via URL

### **Segurança**
- **XSS Protection**: Função `escapeHtml()` implementada
- **URL Validation**: `validarUrl()` para bloquear protocolos perigosos
- **Data Validation**: Validação rigorosa de estrutura JSON
- **Content Sanitization**: Sanitização automática de conteúdo

## ⚙️ Configurações (config.json)

O arquivo `data/config.json` permite personalizar diversos aspectos do portal:

### **Configurações de Comportamento**
```json
"configuracoes": {
  "items_por_pagina": 12,        // Número de itens por página (0 = sem paginação)
  "filtro_padrao": "todos",       // Filtro padrão ao carregar
  "busca_automatica": true,       // Aplicar filtros automaticamente
  "tempo_debounce": 300,          // Tempo de espera (ms) antes de aplicar filtros
  "mostrar_estatisticas": true,   // Mostrar contador de resultados
  "urls_relativas": true          // Usar URLs relativas
}
```

### **Configurações de Tema**
```json
"tema": {
  "cor_primaria": "#4CAF50",      // Cor principal (botões, destaques)
  "cor_secundaria": "#2196F3",    // Cor secundária
  "cor_acento": "#FF9800",        // Cor de destaque
  "fonte_principal": "Segoe UI, ..." // Fonte principal
}
```

### **Recursos Disponíveis**
```json
"recursos": {
  "busca_avancada": true,         // Habilitar busca avançada
  "filtros_multiplos": true,      // Permitir múltiplos filtros
  "visualizacao_3d": true,        // Suporte a modelos 3D
  "compartilhamento": true,       // Botões de compartilhamento
  "responsivo": true,             // Design responsivo
  "modo_escuro": false            // Modo escuro (futuro)
}
```

### **Segurança**
```json
"seguranca": {
  "validacao_xss": true,          // Proteção contra XSS
  "sanitizacao_dados": true,      // Sanitizar dados de entrada
  "url_encoding": true,           // Encoding de URLs
  "validacao_json": true          // Validar estrutura JSON
}
```

## 🤝 Como Contribuir

### **Adicionar Materiais**
1. Edite `database.json` seguindo a estrutura existente
2. Garanta que `id` seja único
3. Use imagens de capa de alta qualidade
4. Teste o novo material no navegador

### **Melhorias de Código**
1. Faça fork do repositório
2. Crie uma branch para sua feature
3. Implemente as melhorias
4. Teste em diferentes navegadores
5. Envie um Pull Request

### **Reportar Bugs**
- Use o sistema de issues do GitHub
- Descreva o problema detalhadamente
- Inclua steps para reproduzir
- Especifique navegador e sistema operacional

### **Convenções de Código**
- **Idioma**: Comentários e nomes de variáveis em português
- **JavaScript**: ES6+, use `const` e `let` (nunca `var`)
- **Formatação**: Indentação com 4 espaços
- **Segurança**: Sempre use `escapeHtml()` para dados externos
- **Acessibilidade**: Adicione ARIA labels quando apropriado
- **Testes**: Execute `teste_integracao.html` antes de enviar PR

### **Guia Rápido para Contribuição**
1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie uma branch** para sua feature: `git checkout -b feature/minha-feature`
4. **Faça suas alterações** seguindo as convenções de código
5. **Teste** sua alteração abrindo `index.html` e `livro.html` no navegador
6. **Execute** `teste_integracao.html` para validar
7. **Commit** suas mudanças: `git commit -m "Adiciona nova feature"`
8. **Push** para seu fork: `git push origin feature/minha-feature`
9. **Abra um Pull Request** com descrição detalhada das mudanças

## 📋 Estrutura do Projeto

```
EduLivro/
├── index.html                  # Página principal do catálogo
├── livro.html                  # Página de visualização individual
├── teste_integracao.html       # Testes de integração e validação
├── README.md                   # Documentação do projeto
├── data/                       # Dados do projeto
│   ├── database.json           # Base de dados dos materiais
│   └── config.json             # Configurações do site
├── js/                         # Scripts JavaScript modulares
│   ├── utils.js                # Utilitários compartilhados
│   ├── catalogo.js             # Lógica da página de catálogo
│   └── livro.js                # Lógica da página de detalhes
└── css/                        # Estilos personalizados
    └── custom.css              # CSS adicional e acessibilidade
```

### **Arquivos Principais**

#### **index.html**
- Página principal com catálogo de materiais
- Sistema de filtros e busca com debounce configurável
- Interface responsiva com cards
- Botão "Limpar Filtros" e contador de resultados
- Integração com `js/catalogo.js`

#### **livro.html**
- Página de visualização individual
- Detalhes completos do material
- Integração com model-viewer 3D
- Botões de compartilhamento e download
- Integração com `js/livro.js`

#### **teste_integracao.html**
- Testes automatizados de validação
- Verifica estrutura de `database.json`
- Valida configurações de `config.json`
- Testa acessibilidade de scripts
- Interface visual com resumo de testes

#### **data/database.json**
- Catálogo com 10+ materiais educacionais
- Metadados e configurações
- Estrutura validada e tipada
- Licenças e informações de copyright

#### **data/config.json**
- Configurações globais do site
- Tema e cores personalizáveis (aplicados via CSS variables)
- Recursos habilitados/desabilitados
- Configurações de segurança
- Tempo de debounce configurável

#### **js/utils.js**
- Funções utilitárias compartilhadas
- `escapeHtml()`: Sanitização para prevenir XSS
- `validarUrl()`: Validação de URLs seguras
- `carregarJson()`: Carregamento assíncrono de JSON
- `obterParametroURL()`: Extração de parâmetros da URL
- `validarLivro()`: Validação de estrutura de dados

#### **js/catalogo.js**
- Lógica da página de catálogo
- Gerenciamento de filtros e busca
- Renderização dinâmica de resultados
- Integração com `config.json`
- Aplicação de tema customizado

#### **js/livro.js**
- Lógica da página de detalhes
- Carregamento e renderização de material
- Validação de URLs de imagens e modelos 3D
- Funcionalidade de compartilhamento
- Tratamento de erros aprimorado

#### **css/custom.css**
- Estilos customizados adicionais
- Melhorias de acessibilidade
- Suporte a CSS variables para temas
- Estados de foco visíveis
- Responsividade aprimorada

## 🔒 Segurança

### **Proteções Implementadas**
- ✅ **XSS Prevention**: Função `escapeHtml()` em `js/utils.js` para sanitização consistente
- ✅ **URL Validation**: Função `validarUrl()` bloqueia protocolos perigosos (javascript:, data:, vbscript:)
- ✅ **URL Encoding**: `encodeURIComponent()` para parâmetros de URL
- ✅ **JSON Validation**: Validação rigorosa de estrutura com `validarLivro()`
- ✅ **Content Sanitization**: Limpeza automática de todo conteúdo exibido
- ✅ **Input Validation**: Validação de IDs e parâmetros com `parseId()`
- ✅ **Error Handling**: Mensagens de erro seguras sem expor detalhes do sistema

### **Auditoria de Segurança**
```bash
# Executar testes de integração no navegador
open teste_integracao.html
# Ou iniciar servidor local e acessar:
python -m http.server 8000
# Então abrir: http://localhost:8000/teste_integracao.html

# Verificar validação JSON
jq . data/database.json
jq . data/config.json

# Testar carregamento de recursos
curl -I http://localhost:8000/index.html
curl -I http://localhost:8000/data/database.json
```

### **Boas Práticas de Segurança**
1. **Sempre use `escapeHtml()`** ao exibir dados de usuário ou JSON
2. **Valide URLs** com `validarUrl()` antes de usar em `src` ou `href`
3. **Use `textContent`** em vez de `innerHTML` quando possível
4. **Valide IDs** com `parseId()` ao processar parâmetros de URL
5. **Teste com `teste_integracao.html`** após adicionar novos materiais

## 📄 Licença

Este projeto está licenciado sob a **Creative Commons Attribution-ShareAlike 4.0 International License**.

**Você é livre para:**
- ✅ Usar, modificar e distribuir
- ✅ Uso comercial permitido
- ✅ Modificar e criar derivados

**Condições:**
- 📝 Atribuição requerida
- 🔄 Compartilhar igual (ShareAlike)
- 📋 Manter a mesma licença

**Veja**: [LICENSE](https://creativecommons.org/licenses/by-sa/4.0/) para detalhes completos.

---

**Desenvolvido com ❤️ para a educação brasileira**

*Portal pedagógico gratuito, open-source e 100% portátil.*