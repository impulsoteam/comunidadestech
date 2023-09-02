![CTech Logo](https://www.comunidades.tech/static/ctech-logo.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/7c842d991bcd66584f19/maintainability)](https://codeclimate.com/github/universoimpulso/comunidadestech/maintainability) [![Website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg?label=about)](http://comunidades.tech) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Twitter Follow](https://img.shields.io/twitter/follow/universoimpulso.svg?style=social&label=Follow)](https://twitter.com/impulso_team) [![Discord](https://img.shields.io/discord/713050127270674442?style=social&logo=discord&link=https://discord.gg/5C5ThXEUAP)](https://discord.gg/5C5ThXEUAP)

### *Comunidades.tech é um espaço de visibilidade e fortalecimento das comunidades de tecnologia*
## Sumário
- [Requisitos](#requisitos)
- [Primeiros passos](#primeiros-passos)
- [Criando um app teste](#criando-um-app-teste)
- [Instalando as dependências](#instalando-as-dependências)
- [Configurando o banco de dados](#configurando-o-banco-de-dados)
- [Rodando o projeto](#rodando-o-projeto)
- [Solucionando problemas](#solucionando-problemas)

## Requisitos
- Node v14.20.1 ou superior
- Mongo v5.7.0 ou superior
- Yarn v1.19.1 ou superior

## Primeiros passos
1. **Faça um Fork do repositório**
<img src="https://i.imgur.com/nSU5hDr.png" width="300" height="220">

2. Após seguir os passos para fazer o fork, clone seu repositório localmente.
```sh
git clone <chave_copiada_no_passo_2>
```

5. **Na raíz de seu projeto crie um arquivo `.env` com as mesmas variáveis de ambiente que estão no arquivo `.env.example`**
    - Deixe esse arquivo aberto e siga o restante das instruções
 

## Criando um app teste
- LinkedIn
  1. Acesse [https://developer.linkedin.com/](https://developer.linkedin.com/)
  2. Clique em **Create app**
     <img src="https://i.imgur.com/pEKewjg.png" width="300" height="220">
  3. Escolha um nome para seu app teste e após isso seleciona a página da Impulso
     <img src="https://i.imgur.com/T6tHC2q.png" width="300" height="220">
  4. Preencha o restante das informações obrigatórias e clique em **Create app**
  5. Na aba **Products**, na opção **Sign in with LInkedIn** clique em **Request access**
     <img src="https://i.imgur.com/nnai0Ul.png" width="300" height="220">
  6. Na aba **Auth**, adicione a URL [http://localhost:3000/auth/linkedin](http://localhost:3000/auth/linkedin)
     <img src="https://i.imgur.com/JK9Hqnc.png" width="300" height="220">
  7. Nessa aba, você também encontrará um **Client ID** e um **Client Secret**. Utilize essas informações para preencher as seguintes variáveis de ambiente:
    ```sh
    LINKEDIN_API_KEY="seu Client ID"
    LINKEDIN_SECRET_KEY="seu Client Secret"
    ```
- Google
  1. Acesse [https://console.cloud.google.com/](https://console.cloud.google.com/) e clique em APIs e Serviços