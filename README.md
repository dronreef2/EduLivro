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
- **URL Encoding**: `encodeURIComponent()` para segurança
- **Data Validation**: Validação rigorosa de estrutura JSON
- **Content Sanitization**: Sanitização automática de conteúdo

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

## 📋 Estrutura do Projeto

```
EduLivro/
├── index.html              # Página principal do catálogo
├── livro.html              # Página de visualização individual
├── database.json           # Base de dados dos materiais
├── config.json             # Configurações do site
├── README.md               # Documentação do projeto
└── teste_integracao.html   # Tests de qualidade (opcional)
```

### **Arquivos Principais**

#### **index.html** (302 linhas)
- Página principal com catálogo de materiais
- Sistema de filtros e busca
- Interface responsiva com cards
- Integração com database.json

#### **livro.html** (311 linhas)
- Página de visualização individual
- Detalhes completos do material
- Integração com model-viewer 3D
- Botões de compartilhamento

#### **database.json** (192 linhas)
- Catálogo com 10+ materiais educacionais
- Metadados e configurações
- Estrutura validada e tipada
- Licenças e informações de copyright

#### **config.json** (45 linhas)
- Configurações globais do site
- Tema e cores personalizáveis
- Recursos habilitados/desabilitados
- Configurações de segurança

## 🔒 Segurança

### **Proteções Implementadas**
- ✅ **XSS Prevention**: Função `escapeHtml()` para sanitização
- ✅ **URL Encoding**: `encodeURIComponent()` para parâmetros
- ✅ **JSON Validation**: Validação rigorosa de estrutura
- ✅ **Content Sanitization**: Limpeza automática de conteúdo
- ✅ **Input Validation**: Validação de todos os dados de entrada

### **Auditoria de Segurança**
```bash
# Executar testes de integração
open teste_integracao.html

# Verificar validação JSON
jq . database.json

# Testar carregamento de recursos
curl -I index.html
curl -I database.json
```

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