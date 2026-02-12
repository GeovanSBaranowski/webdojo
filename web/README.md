# 🧪 Testes Automatizados - Webdojo (Cypress)

## 📌 Sobre o Projeto

Este projeto contém os testes automatizados End-to-End (E2E) da
aplicação **Webdojo**, utilizando o framework **Cypress**.

A aplicação **Webdojo** está localizada no mesmo repositório. Para
execução dos testes, é necessário subir a aplicação localmente antes.

------------------------------------------------------------------------

## 🚀 Tecnologias Utilizadas

-   Node.js
-   Cypress
-   JavaScript
-   Serve (para servir a build da aplicação)

------------------------------------------------------------------------

## 📂 Estrutura do Projeto

    WEB
    │
    ├── cypress
    │   ├── e2e
    │   │   ├── login.cy.js
    │   │   └── ...
    │   │
    │   ├── fixtures
    │   │   ├── cep.json
    │   │   ├── consultancy.json
    │   │   └── document.pdf
    │   │
    │   ├── support
    │   │   ├── actions
    │   │   ├── commands.js
    │   │   ├── e2e.js
    │   │   └── utils.js
    │
    ├── dist
    ├── node_modules
    ├── cypress.config.js
    └── package.json

------------------------------------------------------------------------

## 📁 Descrição das Pastas

### 📌 `cypress/e2e`

Contém os arquivos de testes automatizados.

Exemplo: - `login.cy.js` → Testes relacionados ao fluxo de login.

------------------------------------------------------------------------

### 📌 `cypress/fixtures`

Contém dados mockados utilizados nos testes.

Exemplos: - `cep.json` → Dados simulados de CEP. - `consultancy.json` →
Dados de formulário de consultoria. - `document.pdf` → Arquivo utilizado
para teste de upload.

------------------------------------------------------------------------

### 📌 `cypress/support`

Contém arquivos de suporte e customizações do Cypress.

-   `commands.js` → Comandos customizados.
-   `e2e.js` → Configurações globais.
-   `utils.js` → Funções auxiliares.
-   `actions/` → Abstrações reutilizáveis (Page Objects ou funções
    organizadas por domínio).

------------------------------------------------------------------------

## ⚙️ Pré-requisitos

Antes de executar os testes, certifique-se de ter instalado:

-   Node.js (versão 16+ recomendada)
-   NPM

------------------------------------------------------------------------

## ▶️ Executando a Aplicação Webdojo

A aplicação precisa estar rodando para que os testes funcionem.

Execute:

``` bash
npm run dev
```

A aplicação será iniciada em:

    http://localhost:3000

------------------------------------------------------------------------

## 🧪 Scripts Disponíveis

``` json
"scripts": {
  "dev": "serve -s dist -p 3000",
  "test": "npx cypress run --config viewportWidth=1920,viewportHeight=1080",
  "teste-login": "npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=1920,viewportHeight=1080",
  "teste-login-mobile": "npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=414,viewportHeight=896"
}
```

------------------------------------------------------------------------

## 🖥️ Execução dos Testes

### 🔹 Rodar todos os testes (Desktop - 1920x1080)

``` bash
npm run test
```

### 🔹 Rodar apenas os testes de Login (Desktop)

``` bash
npm run teste-login
```

### 🔹 Rodar testes de Login (Mobile - 414x896)

``` bash
npm run teste-login-mobile
```

------------------------------------------------------------------------

## 📱 Viewports Utilizados

  Tipo      Width   Height
  --------- ------- --------
  Desktop   1920    1080
  Mobile    414     896

------------------------------------------------------------------------

## 🔄 Fluxo de Execução Recomendada

1.  Instalar dependências:

``` bash
npm install
```

2.  Subir a aplicação:

``` bash
npm run dev
```

3.  Em outro terminal, executar os testes:

``` bash
npm run test
```

------------------------------------------------------------------------

## 🧩 Boas Práticas Aplicadas

-   Separação de responsabilidades
-   Reutilização de comandos customizados
-   Uso de fixtures para dados mockados
-   Organização por domínio na pasta `actions`
-   Execução com diferentes viewports (desktop e mobile)

------------------------------------------------------------------------

## 📊 Melhorias Futuras

-   Integração com CI/CD (GitHub Actions)
-   Geração de relatórios (Mochawesome ou Allure)
-   Testes de API com Cypress
-   Execução automática em pipeline
-   Paralelização de testes

------------------------------------------------------------------------

## 👨‍💻 Autor

Projeto de testes automatizados desenvolvido para validação da aplicação
**Webdojo** utilizando Cypress.
