# 🛒 Zydon Plugin Carrinho

Plugin de gestão de carrinhos para a plataforma Zydon B2B, oferecendo funcionalidades completas para gerenciamento de carrinho de compras, checkout e visualização de produtos.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Build](#build)
- [Testes](#testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)

## 🎯 Sobre o Projeto

O **Zydon Plugin Carrinho** é um plugin desenvolvido para a plataforma Zydon B2B que fornece uma solução completa para gestão de carrinhos de compras. O plugin inclui interfaces para:

- **Gestão de Carrinhos**: Interface administrativa para gerenciar carrinhos
- **Checkout**: Processo de finalização de compras
- **Detalhes do Produto**: Visualização detalhada de produtos
- **Configurações**: Painel de configuração do plugin

## ✨ Funcionalidades

- 🛒 **Gestão completa de carrinhos de compras**
- 💳 **Processo de checkout otimizado**
- 📱 **Interface responsiva e moderna**
- ⚙️ **Painel de configurações administrativas**
- 🔐 **Sistema de autenticação integrado**
- 📊 **Visualização de dados com gráficos**
- 🎨 **Interface baseada em Material-UI**

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Material-UI (MUI)** - Componentes de interface
- **React Router DOM** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Recharts** - Gráficos e visualizações
- **Emotion** - CSS-in-JS

### Ferramentas de Desenvolvimento
- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Jest** - Testes unitários
- **Testing Library** - Testes de componentes React

### Zydon Ecosystem
- **@zydon/auth** - Sistema de autenticação
- **@zydon/common** - Componentes compartilhados
- **@zydon/plugin** - Framework de plugins

## 📋 Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **Yarn** ou **npm**
- **Git**

## 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd zydon-plugin-carrinho
   ```

2. **Instale as dependências do frontend**
   ```bash
   cd frontend
   yarn install
   ```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.development` na pasta `frontend/` com as seguintes variáveis:

```env
VITE_MUI_PREMIUM_KEY=sua_chave_mui_premium
VITE_USERNAME=seu_usuario
VITE_PASSWORD=sua_senha
VITE_API=https://api.exemplo.com
VITE_ACCOUNT_API=https://account-api.exemplo.com
```

#### Descrição das Variáveis:
- **VITE_MUI_PREMIUM_KEY**: Chave de licença do MUI Premium
- **VITE_USERNAME**: Usuário para autenticação
- **VITE_PASSWORD**: Senha para autenticação
- **VITE_API**: URL da API principal
- **VITE_ACCOUNT_API**: URL da API de contas

### Configuração do Plugin

O arquivo `configuration.yml` na raiz do projeto contém as configurações do plugin:

```yaml
version: "1.0.0"
auth:
  type: "none"
admin_launchers:
  id: "gestao-de-carrinhos"
  name: "Gestão de Carrinhos"
  route: "/"
```

## 🚀 Execução

### Desenvolvimento
```bash
cd frontend
yarn dev
```

### Preview do Build
```bash
cd frontend
yarn preview
```

## 🏗️ Build

### Build de Produção
```bash
cd frontend
yarn build
```

### Builds Específicos
```bash
# Build para aplicação principal
yarn build:app

# Build para checkout
yarn build:checkout

# Build para detalhes do produto
yarn build:product-detail
```

## 🧪 Testes

```bash
cd frontend

# Executar todos os testes
yarn test

# Testes com coverage
yarn test:coverage

# Testes em modo watch
yarn test:watch

# Gerar relatório de testes
yarn report
```

## 📁 Estrutura do Projeto

```
zydon-plugin-carrinho/
├── configuration.yml          # Configuração do plugin
├── README.md                 # Documentação principal
├── frontend/                 # Código fonte do frontend
│   ├── src/
│   │   ├── @app/            # Aplicação principal
│   │   ├── @app-checkout/   # Módulo de checkout
│   │   ├── @app-product-detail/ # Detalhes do produto
│   │   ├── @configs/        # Configurações
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # Serviços e APIs
│   │   └── test/           # Utilitários de teste
│   ├── package.json        # Dependências do projeto
│   └── vite.config.ts      # Configuração do Vite
└── native-resources/        # Recursos nativos do plugin
    ├── databases.yml
    ├── menu-items.yml
    ├── tables.yml
    └── webhooks.yml
```

## 🎨 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `yarn dev` | Inicia o servidor de desenvolvimento |
| `yarn build` | Gera build de produção |
| `yarn build:app` | Build específico da aplicação |
| `yarn build:checkout` | Build específico do checkout |
| `yarn build:product-detail` | Build específico dos detalhes do produto |
| `yarn test` | Executa os testes |
| `yarn test:coverage` | Executa testes com coverage |
| `yarn lint` | Executa o linting do código |
| `yarn lint:fix` | Corrige automaticamente problemas de linting |
| `yarn format` | Formata o código com Prettier |

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use **TypeScript** para tipagem
- Siga as regras do **ESLint** configurado
- Formate o código com **Prettier**
- Escreva testes para novas funcionalidades
- Mantenha a documentação atualizada

## 📄 Licença

Este projeto é propriedade da Zydon Tecnologia.

---

**Desenvolvido com ❤️ pela equipe Zydon**