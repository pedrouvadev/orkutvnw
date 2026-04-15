# OrkutVNW 2026 - Rede Social Híbrida Astro + React

![Astro](https://img.shields.io/badge/Astro-6.1.7-BC52EE?style=flat-square&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.183.2-000000?style=flat-square&logo=threedotjs&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.15.0-5A29E4?style=flat-square&logo=axios&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0.4-646CFF?style=flat-square&logo=vite&logoColor=white)

---

## Visão Geral

**OrkutVNW 2026** é uma aplicação web moderna de rede social inspirada no clássico Orkut, reconstruída com arquitetura híbrida utilizando **Astro** para renderização estática/SSG e **React** para componentes interativos client-side. O sistema resolve o problema de criar uma plataforma performática para compartilhamento de posts, combinando o melhor do SSR (Server-Side Rendering) com a interatividade de uma SPA.

**Problema de Negócio**: Necessidade de uma plataforma de rede social com carregamento inicial ultra-rápido (HTML estático gerado em build time), SEO otimizado, e interatividade granular apenas onde necessário, reduzindo o JavaScript enviado ao cliente.

---

## Arquitetura do Sistema

### Padrão Arquitetural: Islands Architecture (Astro)

O projeto adota a **Islands Architecture** promovida pelo Astro, combinada com uma estrutura em camadas:

- **Camada de Renderização (Astro)**: Páginas estáticas (.astro) com islands de interatividade
- **Camada de Hidratação (React)**: Componentes interativos hidratados via `client:only` ou `client:load`
- **Camada de Estado Global**: Context API React para autenticação (client-side only)
- **Camada de Serviços**: Axios com interceptors para integração com API REST
- **Camada de Proteção**: Client-side route guards via localStorage + verificações em componentes

### Comunicação entre Componentes

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Build Time (Astro)                           │
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────┐   │
│  │  Layout.astro    │───▶│   Pages (.astro)  │───▶│  React       │   │
│  │  (Template HTML) │    │  (Static Routes)  │    │  Islands     │   │
│  └──────────────────┘    └──────────────────┘    │  (Hydrated)  │   │
│                                                   └──────┬───────┘   │
└──────────────────────────────────────────────────────────┼───────────┘
                                                           │
                    Client-Side (Browser)                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────┐   │
│  │  AuthForm        │    │   PostFeed       │    │  localStorage│   │
│  │  (React Island)  │    │  (React Island)  │    │  (Token JWT) │   │
│  └────────┬─────────┘    └────────┬─────────┘    └──────┬───────┘   │
│           │                     │                     │             │
│           └─────────────────────┴─────────────────────┘             │
│                                 │                                   │
│                        ┌────────▼────────┐                        │
│                        │  Axios Service    │                        │
│                        │  + Interceptors   │                        │
│                        └────────┬────────┘                        │
└─────────────────────────────────┼───────────────────────────────────┘
                                  ▼
                        ┌──────────────────┐
                        │  API Externa     │
                        │  (Render.com)    │
                        └──────────────────┘
```

---

## Stack Tecnológica

### Core Framework

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Astro** | 6.1.7 | Framework web moderno para sites de conteúdo com Islands Architecture |
| **React** | 19.2.4 | Biblioteca para componentes interativos client-side |
| **@astrojs/react** | 5.0.3 | Integração oficial Astro + React |

### Estilização & UI

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **TailwindCSS** | 4.0.0 | Framework CSS utility-first |
| **@tailwindcss/postcss** | 4.2.2 | Plugin PostCSS para Tailwind v4 |
| **Sass** | 1.99.0 | Pré-processador CSS (arquivos legados) |

### Gráficos 3D & Animações

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Three.js** | 0.183.2 | Biblioteca 3D para WebGL |
| **@react-three/fiber** | 9.6.0 | Renderer React para Three.js |
| **@react-three/drei** | 10.7.7 | Helpers e abstrações para R3F |
| **GSAP** | 3.15.0 | GreenSock Animation Platform para animações avançadas |
| **Lenis** | 1.3.23 | Smooth scrolling library |

### HTTP & Roteamento

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Axios** | 1.15.0 | Cliente HTTP para requisições à API |
| **React Router DOM** | 7.14.0 | Roteamento client-side (em componentes React) |

### Qualidade de Código

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **ESLint** | 9.39.4 | Análise estática de código com flat config |
| **eslint-plugin-react-hooks** | 7.0.1 | Regras para React Hooks |
| **eslint-plugin-react-refresh** | 0.5.2 | Suporte ao Fast Refresh |
| **globals** | 17.4.0 | Definições de globais para ESLint |

### Infraestrutura

- **Hospedagem**: GitHub Pages (via `gh-pages`)
- **Base Path**: `/orkutvnw/` (configurado em astro.config.mjs)
- **Output**: Static Site Generation (SSG)
- **API Backend**: `https://api-orkut-qe4l.onrender.com`
- **Autenticação**: JWT Bearer Token (client-side via localStorage)

---

## Estrutura de Pastas

```
orkutvnw/
├── public/                          # Assets estáticos
│   ├── favicon.svg                  # Ícone da aplicação
│   └── icons.svg                    # Sprite de ícones
├── src/
│   ├── assets/                      # Assets processados pelo build
│   ├── components/                  # Componentes organizados por tipo
│   │   ├── astro/                   # Componentes Astro (.astro)
│   │   ├── post/                    # Componentes legados de post
│   │   ├── react/                   # Islands React interativas
│   │   │   ├── AuthContext.jsx      # Definição do Context API
│   │   │   ├── AuthForm.jsx         # Formulário login/cadastro
│   │   │   ├── AuthProvider.jsx     # Provider de autenticação
│   │   │   ├── PostFeed.jsx         # Feed de posts completo
│   │   │   └── PostItem.jsx         # Item individual de post
│   │   └── ui/                      # Componentes de UI genéricos
│   ├── context/                     # Context API legado (manter compatibilidade)
│   │   ├── AuthContext.jsx
│   │   └── AuthProvider.jsx
│   ├── layouts/                     # Layouts Astro
│   │   └── Layout.astro             # Layout base com metatags
│   ├── pages/                       # Rotas baseadas em arquivo (Astro)
│   │   ├── index.astro              # Página inicial (Feed) - PROTEGIDA
│   │   ├── login.astro              # Página de login
│   │   └── register.astro           # Página de cadastro
│   ├── routes/                      # Componentes de roteamento/proteção
│   │   └── PrivateRoutes.jsx        # Guard de rotas (legado Vite)
│   ├── services/                    # Integração com API
│   │   └── api.js                   # Configuração Axios + Interceptors
│   ├── styles/                      # Estilos globais
│   │   └── global.css               # Tailwind CSS directives
│   ├── App.jsx                      # Router legado (Vite)
│   ├── globalStyle.scss             # Reset CSS legado
│   └── main.jsx                     # Entry point legado (Vite)
├── astro.config.mjs                 # Configuração Astro
├── eslint.config.js               # Configuração ESLint (flat config)
├── index.html                     # Template HTML legado
├── package.json                   # Dependências e scripts
├── README.md                      # Documentação
└── vite.config.js                 # Configuração Vite legada
```

---

## Fluxo Principal (Workflow)

### 1. Fluxo de Renderização (Astro Islands)

```
Build Time:
Astro pages (.astro) ──▶ HTML Estático ──▶ Deploy (GitHub Pages)
                              │
                              ▼ (Hydration seletiva)
                    React Islands (client:only="react")
```

### 2. Fluxo de Autenticação Client-Side

```
Usuário → /orkutvnw/login (Astro page)
    ↓
AuthForm.jsx (client:only="react") renderiza
    ↓
Preenche credenciais → Submit
    ↓
POST /login → API retorna token JWT
    ↓
localStorage.setItem("token", token)
    ↓
Redirect para /orkutvnw/
    ↓
PostFeed.jsx verifica token → Carrega posts
```

### 3. Fluxo de CRUD de Posts

```
PostFeed.jsx (island interativa)
    ├── GET  /posts     → Listar todos os posts
    ├── POST /posts     → Criar novo post (autenticado)
    ├── PUT  /posts/:id → Atualizar post existente
    └── DELETE /posts/:id → Remover post

Todas as requisições passam pelo interceptor Axios
que adiciona: Authorization: Bearer ${token}
```

### 4. Fluxo de Hidratação Astro

```
Servidor (Build Time):
Layout.astro renderiza ▶ index.astro inclui PostFeed.jsx
                              │
                              ▼
                    client:only="react" directive
                              │
Browser (Runtime):
                    React hidrata apenas este componente
                              │
                    Outras partes permanecem HTML estático
```

---

## Configuração e Instalação

### Pré-requisitos

| Ferramenta | Versão Mínima | Obrigatório |
|------------|---------------|-------------|
| **Node.js** | 18.x ou superior | Sim |
| **npm** | 9.x ou superior | Sim |
| **Git** | 2.x ou superior | Sim |

### Passo a Passo para Ambiente de Desenvolvimento

1. **Clone o repositório**

```bash
git clone https://github.com/jefersonssant/orkutvnw.git
cd orkutvnw
```

2. **Instale as dependências**

```bash
npm install
```

3. **Inicie o servidor de desenvolvimento Astro**

```bash
npm run dev
```

4. **Acesse a aplicação**

Abra o navegador em `http://localhost:4321` (porta padrão do Astro)

### Exemplo de Arquivo de Variáveis de Ambiente (.env.example)

```env
# ==========================================
# Configuração da API Backend
# ==========================================
PUBLIC_API_BASE_URL=https://api-orkut-qe4l.onrender.com

# ==========================================
# Configuração de Ambiente
# ==========================================
PUBLIC_ENV=development

# ==========================================
# Astro Config
# ==========================================
ASTRO_TELEMETRY_DISABLED=1
```

**Nota sobre variáveis de ambiente no Astro**:
- Use `PUBLIC_` prefix para variáveis acessíveis no client-side
- Variáveis sem prefixo são acessíveis apenas no server-side durante o build
- Modifique `src/services/api.js` para usar `import.meta.env.PUBLIC_API_BASE_URL`

---

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento Astro com HMR |
| `npm run build` | Gera build estática para produção na pasta `dist/` |
| `npm run preview` | Pré-visualiza a build estática localmente |
| `npm run lint` | Executa ESLint em todos os arquivos do projeto |
| `npm run deploy` | Deploy para GitHub Pages usando gh-pages |

### Exemplos de Uso

```bash
# Desenvolvimento local
npm run dev

# Build para produção
npm run build

# Preview local da build
npm run preview

# Análise estática de código
npm run lint

# Deploy para GitHub Pages
npm run deploy
```

---

## Padrões de Projeto (Design Patterns)

### 1. **Islands Architecture (Astro)**
Hidratação parcial onde apenas componentes interativos são carregados como JavaScript.

```astro
<!-- Exemplo: Apenas AuthForm é hidratado -->
<AuthForm mode="login" client:only="react" />
```

### 2. **Context API (Provider Pattern)**
Gerenciamento de estado de autenticação sem prop drilling.

```jsx
// src/components/react/AuthProvider.jsx
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("token");
    }
    return null;
  });
  
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### 3. **Axios Interceptors (Middleware Pattern)**
Injeção automática de headers de autenticação.

```javascript
// src/services/api.js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 4. **Component Composition**
Separação de responsabilidades em componentes pequenos:
- `PostFeed.jsx` → Container com estado e lógica
- `PostItem.jsx` → Apresentação pura (presentational component)

### 5. **File-Based Routing (Astro)**
Rotas definidas pela estrutura de arquivos em `src/pages/`.

---

## Integração com API

### Endpoints da API Backend

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `POST` | `/login` | Autentica usuário e retorna JWT | Não |
| `POST` | `/usuarios` | Cria novo usuário | Não |
| `GET` | `/posts` | Lista todos os posts | Sim (Bearer) |
| `POST` | `/posts` | Cria novo post | Sim (Bearer) |
| `PUT` | `/posts/:id` | Atualiza post existente | Sim (Bearer) |
| `DELETE` | `/posts/:id` | Remove post | Sim (Bearer) |

### Exemplos de Requisição

```javascript
// Autenticação
const { data } = await api.post("/login", { email, senha });
localStorage.setItem("token", data.token);

// CRUD de Posts
const posts = await api.get("/posts");
await api.post("/posts", { titulo, conteudo });
await api.put(`/posts/${id}`, { titulo, conteudo });
await api.delete(`/posts/${id}`);
```

---

## Configuração de Deploy

### GitHub Pages (Configurado)

O projeto está configurado para deploy automático no GitHub Pages:

```javascript
// astro.config.mjs
export default defineConfig({
  output: 'static',
  base: '/orkutvnw/',  // Nome do repositório
  vite: {
    build: {
      outDir: 'dist',
    },
  },
});
```

**Passos para deploy**:
1. Execute `npm run build` para gerar a build
2. Execute `npm run deploy` para publicar no GitHub Pages

### Configuração no GitHub

1. Acesse **Settings → Pages** no repositório
2. Configure **Source** como "Deploy from a branch"
3. Selecione a branch `gh-pages` e pasta `/ (root)`

---

## Considerações Técnicas

### SSR vs Client-Side Auth
- O projeto utiliza **client-side authentication** via localStorage
- O middleware Astro (`src/middleware.js`) está desabilitado
- A proteção de rotas ocorre em runtime no browser via verificações nos componentes React

### Compatibilidade de Arquivos Legados
- Arquivos da estrutura Vite (App.jsx, main.jsx, pages/login/) são mantidos para referência
- A aplicação efetivamente usa as rotas Astro em `src/pages/*.astro`

---

## Contatos e Autor

**Desenvolvido por**: Jeferson Santos

- **GitHub**: [@jefersonssant](https://github.com/jefersonssant)
- **Projeto**: [orkutvnw](https://github.com/jefersonssant/orkutvnw)

---

## Licença

Este projeto é desenvolvido para fins educacionais como parte do curso **Vai na Web** - Backend.

---

## Status do Projeto

| Feature | Status |
|---------|--------|
| ✅ Integração Astro + React | Concluído |
| ✅ Tailwind CSS v4 | Concluído |
| ✅ Autenticação JWT | Concluído |
| ✅ CRUD de Posts | Concluído |
| ✅ Client-side Route Guards | Concluído |
| ✅ Deploy GitHub Pages | Concluído |
| ⚠️ Three.js / R3F | Configurado (não implementado nas páginas) |
| ⚠️ GSAP Animations | Instalado (não implementado) |
| ⚠️ Lenis Smooth Scroll | Instalado (não implementado) |

---

## Roadmap Futuro

- [ ] Implementar animações GSAP na transição de páginas
- [ ] Adicionar componente 3D com Three.js na página inicial
- [ ] Implementar smooth scroll com Lenis
- [ ] Sistema de comentários nos posts
- [ ] Sistema de curtidas (likes)
- [ ] Upload de imagens de perfil
- [ ] Temas claro/escuro
- [ ] Testes E2E com Playwright
- [ ] Migração para TypeScript
- [ ] Implementar PWA (Service Worker)
