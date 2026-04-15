# OrkutVNW - Rede Social Inspirada no Orkut

![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0.4-646CFF?style=flat-square&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.15.0-5A29E4?style=flat-square&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.14.0-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-1.99.0-CC6699?style=flat-square&logo=sass&logoColor=white)

---

## Visão Geral

OrkutVNW é uma aplicação web de rede social inspirada no clássico Orkut, desenvolvida como uma Single Page Application (SPA) moderna. O sistema resolve o problema de criar uma plataforma para compartilhamento de posts, permitindo que usuários se cadastrem, autentiquem-se e interajam através de publicações em um feed social.

**Problema de Negócio**: Necessidade de uma plataforma leve e intuitiva para compartilhamento de conteúdo em formato de rede social, com autenticação segura e gerenciamento de posts em tempo real.

---

## Arquitetura do Sistema

### Padrão Arquitetural

O projeto utiliza uma arquitetura **Client-Side SPA (Single Page Application)** com organização em camadas:

- **Camada de Apresentação (UI)**: Componentes React organizados por funcionalidade (pages, components)
- **Camada de Estado Global**: Context API para gerenciamento de autenticação
- **Camada de Serviços**: Integração com API externa via Axios com interceptors
- **Camada de Roteamento**: React Router DOM com proteção de rotas privadas

### Comunicação entre Componentes

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (SPA)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Pages      │  │  Components  │  │   Context    │ │
│  │  (Login,     │◄─│  (Post)      │◄─│  (Auth)      │ │
│  │  Register,   │  │              │  │              │ │
│  │  Home)       │  │              │  │              │ │
│  └──────┬───────┘  └──────────────┘  └──────┬───────┘ │
│         │                                  │           │
│         └──────────────┬───────────────────┘           │
│                        ▼                               │
│              ┌──────────────────┐                     │
│              │  React Router    │                     │
│              └────────┬─────────┘                     │
│                       ▼                               │
│              ┌──────────────────┐                     │
│              │  Axios Service   │                     │
│              │  (API Interceptor)│                    │
│              └────────┬─────────┘                     │
└───────────────────────┼───────────────────────────────┘
                        ▼
              ┌──────────────────┐
              │  API Externa     │
              │  (Render.com)    │
              └──────────────────┘
```

---

## Stack Tecnológica

### Frontend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **React** | 19.2.4 | Biblioteca JavaScript para construção de interfaces |
| **Vite** | 8.0.4 | Build tool e dev server extremamente rápido |
| **React Router DOM** | 7.14.0 | Roteamento declarativo para React |
| **Axios** | 1.15.0 | Cliente HTTP para requisições à API |
| **Sass** | 1.99.0 | Pré-processador CSS para estilização |

### Desenvolvimento

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **ESLint** | 9.39.4 | Linting e análise estática de código |
| **@vitejs/plugin-react** | 6.0.1 | Plugin React para Vite |
| **eslint-plugin-react-hooks** | 7.0.1 | Regras específicas para React Hooks |
| **eslint-plugin-react-refresh** | 0.5.2 | Otimização para Fast Refresh |

### Infraestrutura

- **API Backend**: Hospedada no Render.com
- **Base URL**: `https://api-orkut-qe4l.onrender.com`
- **Autenticação**: JWT (JSON Web Tokens) via Bearer Token

---

## Estrutura de Pastas

```
orkutvnw/
├── public/
│   ├── favicon.svg          # Ícone da aplicação
│   └── icons.svg            # Ícones do sistema
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   └── post/
│   │       ├── Post.jsx           # Componente de exibição de post
│   │       └── Post.module.scss  # Estilos do Post
│   ├── context/             # Context API para estado global
│   │   ├── AuthContext.jsx       # Definição do contexto de autenticação
│   │   └── AuthProvider.jsx      # Provider do contexto de autenticação
│   ├── pages/               # Páginas da aplicação
│   │   ├── home/
│   │   │   ├── Home.jsx           # Página principal (feed)
│   │   │   └── Home.module.scss   # Estilos da Home
│   │   ├── login/
│   │   │   ├── Login.jsx          # Página de login
│   │   │   └── Login.module.scss  # Estilos do Login
│   │   └── register/
│   │       ├── Register.jsx       # Página de cadastro
│   │       └── Register.module.scss # Estilos do Register
│   ├── routes/              # Configuração de rotas
│   │   └── PrivateRoutes.jsx      # Componente de proteção de rotas
│   ├── services/            # Serviços externos
│   │   └── api.js                # Configuração do Axios com interceptors
│   ├── App.jsx              # Componente principal com rotas
│   ├── main.jsx             # Entry point da aplicação
│   └── globalStyle.scss     # Estilos globais
├── index.html               # Template HTML
├── package.json             # Dependências e scripts
├── vite.config.js           # Configuração do Vite
├── eslint.config.js         # Configuração do ESLint
└── README.md                # Documentação do projeto
```

---

## Fluxo Principal (Workflow)

### 1. Fluxo de Autenticação

```
Usuário → Tela Login/Register
    ↓
Preenche credenciais
    ↓
POST /login ou /usuarios (API)
    ↓
API retorna token JWT
    ↓
Token armazenado no localStorage
    ↓
AuthProvider atualiza estado global
    ↓
Usuário redirecionado para Home (rota protegida)
```

### 2. Fluxo de Requisição à API

```
Componente → chama api.post/get/put/delete
    ↓
Axios Interceptor adiciona Bearer Token
    ↓
Requisição enviada para API Externa
    ↓
API processa e retorna dados
    ↓
Componente atualiza estado local
    ↓
UI re-renderiza com novos dados
```

### 3. Fluxo de Criação de Post

```
Usuário → Página Home
    ↓
Preenche título e conteúdo
    ↓
Submete formulário
    ↓
POST /posts (API com token)
    ↓
API cria post e retorna dados
    ↓
Lista de posts atualizada no estado
    ↓
Feed exibe novo post
```

---

## Configuração e Instalação

### Pré-requisitos

| Ferramenta | Versão Mínima |
|------------|---------------|
| **Node.js** | 18.x ou superior |
| **npm** | 9.x ou superior |
| **Git** | 2.x ou superior |

### Passo a Passo para Ambiente de Desenvolvimento

1. **Clone o repositório**

```bash
git clone https://github.com/pedrouvadev/orkutvnw.git
cd orkutvnw
```

2. **Instale as dependências**

```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

4. **Acesse a aplicação**

Abra o navegador em `http://localhost:5173`

### Exemplo de Arquivo de Variáveis de Ambiente (.env.example)

```env
# Configuração da API
VITE_API_BASE_URL=https://api-orkut-qe4l.onrender.com

# Configuração de Ambiente
VITE_ENV=development
```

**Nota**: O projeto atualmente utiliza a URL da API diretamente no arquivo `src/services/api.js`. Para usar variáveis de ambiente, modifique o arquivo para utilizar `import.meta.env.VITE_API_BASE_URL`.

---

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento com Hot Module Replacement (HMR) |
| `npm run build` | Cria uma build otimizada para produção na pasta `dist/` |
| `npm run preview` | Pré-visualiza a build de produção localmente |
| `npm run lint` | Executa o ESLint para análise estática do código |

### Exemplos de Uso

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Linting
npm run lint
```

---

## Padrões de Projeto (Design Patterns)

### 1. **Context API (Provider Pattern)**
Utilizado para gerenciamento de estado global de autenticação, permitindo que qualquer componente acesse o token e funções de login/logout sem prop drilling.

```javascript
// Exemplo: AuthProvider.jsx
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### 2. **Axios Interceptors (Middleware Pattern)**
Implementa middleware para adicionar automaticamente o token de autenticação em todas as requisições HTTP.

```javascript
// Exemplo: api.js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 3. **Private Routes (Guard Pattern)**
Proteção de rotas que requerem autenticação, redirecionando usuários não autenticados para a página de login.

```javascript
// Exemplo: PrivateRoutes.jsx
export default function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
}
```

### 4. **Component Composition**
Separação de responsabilidades em componentes pequenos e reutilizáveis (ex: Post component).

### 5. **Custom Hooks Pattern**
Uso de hooks customizados através do Context API para encapsular lógica de autenticação.

---

## API Integration

### Endpoints Utilizados

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/login` | Autentica usuário e retorna token | Não |
| POST | `/usuarios` | Cria novo usuário | Não |
| GET | `/posts` | Lista todos os posts | Sim |
| POST | `/posts` | Cria novo post | Sim |
| PUT | `/posts/:id` | Atualiza post existente | Sim |
| DELETE | `/posts/:id` | Remove post | Sim |

### Exemplo de Requisição

```javascript
// Login
const response = await api.post("/login", { email, senha });
const token = response.data.token;

// Criar Post
const response = await api.post("/posts", { titulo, conteudo });
```

---

## Contatos e Autor

**Desenvolvido por**: Pedro Uva Dev

- **GitHub**: [pedrouvadev](https://github.com/pedrouvadev)
- **LinkedIn**: [Pedro Uva](https://linkedin.com/in/pedrouvadev)
- **Email**: pedrouvadev@gmail.com

---

## Licença

Este projeto é desenvolvido para fins educacionais e de aprendizado.

---

## Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## Status do Projeto

✅ Autenticação de usuários (Login/Register)  
✅ Feed de posts em tempo real  
✅ Criação, edição e exclusão de posts  
✅ Proteção de rotas privadas  
✅ Interceptor automático de token  
✅ Estilização com Sass/SCSS  

---

## Roadmap Futuro

- [ ] Implementação de comentários nos posts
- [ ] Sistema de curtidas (likes)
- [ ] Perfil de usuário com avatar
- [ ] Upload de imagens nos posts
- [ ] Notificações em tempo real
- [ ] Testes automatizados (Jest, React Testing Library)
- [ ] TypeScript migration
- [ ] PWA (Progressive Web App)
