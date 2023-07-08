![CTech Logo](https://www.comunidades.tech/static/ctech-logo.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/7c842d991bcd66584f19/maintainability)](https://codeclimate.com/github/universoimpulso/comunidadestech/maintainability) [![Website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg?label=about)](http://comunidades.tech) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Twitter Follow](https://img.shields.io/twitter/follow/universoimpulso.svg?style=social&label=Follow)](https://twitter.com/UniversoImpulso) ![Discord](https://img.shields.io/discord/713050127270674442?style=social&logo=discord&link=https%3A%2F%2Fdiscord.gg%2FRBM6sh63cB)

### *Comunidades.tech é um espaço de visibilidade e fortalecimento das comunidades de tecnologia*
## Sumário
- [Requisitos](#requisitos)
- [Primeiros passos](#primeiros_passos)
- [Criando um app teste](#criando_um_app_teste)

## Requisitos
- Node v14.20.1 ou superior
- Mongo v5.7.0 ou superior
- Yarn v1.19.1 ou superior

## Primeiros passos
1. **Faça um Fork do repositório**
<img src="https://i.imgur.com/nSU5hDr.png" width="300" height="220">

2. **Após seguir os passos para fazer o fork, escolha uma das opções de chave para clonar seu novo repositório e clique em copiar**

<img src="https://i.imgur.com/3bTKbdW.png" width="300" height="220"> 
<img src="https://i.imgur.com/cyPAQ48.png" width="300" height="220">

3. **Crie um diretório em sua máquina para armazenar esse repositório localmente e abra esse diretório em seu editor de código de preferencia. Você pode fazer isso por clicar com o botão direito do mouse e clicar na opção "Abrir com". Ou através da linha de comando no terminal do seu editor dessa maneira:**
    - Use o comando `ls -l ` sempre que precisar para listar o conteúdo de um diretório
    - Use o comando `cd <nome_do_diretório>` para mudar o diretório atual até ingressar no diretório correto

4. **Clone seu repositório**
```sh
git clone <chave_copiada_no_passo_2>
```

5. **Na raíz de seu projeto crie um arquivo `.env` com as mesmas variáveis de ambiente que estão no arquivo `.env.example`**

6. Atualize a variável de ambiente `JWT_SECRET_KEY` do arquivo `.env` com um valor de sua escolha
    - Deixe esse arquivo aberto e siga o restante das instruções
 

## Criando um app teste
- **LinkedIn**
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

- **Google**
  1. Acesse [https://console.cloud.google.com/](https://console.cloud.google.com/) e clique no menu dropdown superior
    <img src="https://i.imgur.com/iNvLgQD.png" width="300" height="220">

  2. Clique em **NEW PROJECT**, preencha o nome do projeto e clique em **CREATE**

  3. Selecione o projeto recém criado, clique em **APIs & Services** e em **OAuth consent screen**
    <img src="https://i.imgur.com/iNvLgQD.png" width="300" height="220">

  4. Selecione **Internal** e clique em **CREATE**
  
  5. Preencha apenas o seguintes campos:
     - App name
     - User suport email
     - Developer contact information

  6. Após clicar em **SAVE AND CONTINUE** selecione a sessão **Credentials**
    <img src="https://i.imgur.com/tRbsrac.png" width="300" height="220">

  7. Clique em **Create credentials** e selecione **OAuth client ID**

  8. Preencha apenas os campos **Application type** e **Name**. Depois clique em **CREATE**

  9. Copie seu **Client ID** e seu **Client secret**
  <img src="https://i.imgur.com/PwMceTN.png" width="300" height="220">

  10. Atualize as seguintes variáveis de ambiente no arquivo `.env`
  ```sh
  GOOGLE_CLIENT_ID="seu Client ID"
  GOOGLE_SECRET="seu Client secret"
  ```

## Configurando o banco de dados
  1. 