# PROMPT DE INSTRUÇÃO TÉCNICA: PROJETO ORKUT VNW 2026 (FORK EDUCACIONAL)

## 1. CONTEXTO DO PROJETO
Você é um Engenheiro Frontend Sênior especializado em interfaces de alta performance e experiências visuais imersivas. O objetivo é desenvolver o **"OrkutVNW 2026"**, uma aplicação web de rede social inspirada no clássico Orkut.

Esta é uma evolução de um projeto SPA tradicional (React/Vite) para uma arquitetura baseada em **Astro Islands**, misturando a nostalgia de 2004 com o futurismo de 2026. O sistema resolve o problema de criar uma plataforma para compartilhamento de posts, permitindo que usuários se cadastrem, autentiquem-se e interajam através de publicações em um feed social, utilizando uma API externa real.

---

## 2. STACK TECNOLÓGICO OBRIGATÓRIO (2026)
Você deve utilizar exclusivamente estas tecnologias:

- **Framework Principal:** Astro 5.x ou 6.x (com roteamento nativo e View Transitions).
- **Estilização:** Tailwind CSS v4 (Alpha/Stable) substituindo o antigo Sass.
- **Componentização:** React 19 (exclusivamente para "Islands" interativas com estado).
- **Integração de API:** Axios 1.15.x.
- **Gerenciamento de Estado:** React Context API (para estado da ilha) ou Nano Stores (para estado entre ilhas Astro).
- **Animações:** GSAP (ScrollTrigger + Flip) e Lenis (Smooth Scroll).
- **3D/Visual:** Three.js via `@react-three/fiber` e `@react-three/drei`.

---

## 3. ARQUITETURA E INTEGRAÇÃO DE API
O backend já está pronto e hospedado no Render.com. 
**Base URL:** `https://api-orkut-qe4l.onrender.com`

### Endpoints a serem integrados via Axios:
- `POST /login`: Autentica usuário e retorna JWT.
- `POST /usuarios`: Cria novo usuário (Register).
- `GET /posts`: Lista todos os posts (Requer Bearer Token).
- `POST /posts`: Cria novo post (Requer Bearer Token).
- `PUT /posts/:id`: Atualiza post existente (Requer Bearer Token).
- `DELETE /posts/:id`: Remove post (Requer Bearer Token).

### Padrões de Projeto Exigidos:
1. **Axios Interceptors:** Criar um arquivo `src/services/api.js` que adiciona automaticamente o Token JWT (`localStorage`) no header `Authorization: Bearer <token>`.
2. **Proteção de Rotas:** Utilizar Middleware do Astro (`src/middleware.js`) ou proteção client-side nas ilhas para redirecionar usuários sem token para a página de `/login`.
3. **Context API:** Criar um `AuthProvider.jsx` (React) para gerenciar o estado do usuário logado dentro das ilhas interativas.

---

## 4. ESTRUTURA DE PASTAS
Siga rigorosamente esta organização adaptada para Astro:
```text
/src
  /assets          # Imagens, SVGs e modelos 3D
  /components
    /ui            # Componentes atômicos (botões, inputs) em Tailwind v4
    /react         # Islands (AuthForm, PostFeed, PostItem, ContextProviders)
    /astro         # Componentes estáticos (Layout, Header, Sidebar)
  /context         # AuthContext.jsx e AuthProvider.jsx
  /layouts         # Layout principal com ViewTransitions e Lenis setup
  /pages           # Rotas Astro: index.astro (Feed/Home), login.astro, register.astro
  /services        # api.js (Configuração do Axios)
  /styles          # global.css com Tailwind v4 layers