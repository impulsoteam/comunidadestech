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
### **LinkedIn**
1. Acesse [https://developer.linkedin.com/](https://developer.linkedin.com/).

2. Clique em **Create app**.
  <img src="https://i.imgur.com/pEKewjg.png" width="300" height="220">

3. Escolha um nome para seu app teste e após isso selecione a página da Impulso.
  <img src="https://i.imgur.com/T6tHC2q.png" width="300" height="220">

4. Preencha o restante das informações obrigatórias e clique em **Create app**.

5. Na aba **Products**, na opção **Sign in with LInkedIn** clique em **Request access**.
  <img src="https://i.imgur.com/nnai0Ul.png" width="300" height="220">

6. Na aba **Auth**, adicione a URL [http://localhost:3000/auth/linkedin](http://localhost:3000/auth/linkedin).
  <img src="https://i.imgur.com/JK9Hqnc.png" width="300" height="220">

7. Nessa aba, você também encontrará um **Client ID** e um **Client Secret**.
   
   Utilize essas informações para preencher as seguintes variáveis de ambiente no arquivo `.env`  :

   

   ```sh
    LINKEDIN_API_KEY="seu Client ID"
    LINKEDIN_SECRET_KEY="seu Client Secret"
   ```
   
### **Google**
1. Acesse [https://console.cloud.google.com/](https://console.cloud.google.com/) e clique no menu dropdown superior.
  <img src="https://i.imgur.com/iNvLgQD.png" width="300" height="220">

2. Clique em **NEW PROJECT**, preencha o nome do projeto e clique em **CREATE**.

3. Selecione o projeto recém criado, clique em **APIs & Services** e em **OAuth consent screen**.
  <img src="https://i.imgur.com/HveqLG2.png" width="300" height="220">

4. Selecione **Internal** e clique em **CREATE**.

5. Preencha apenas o seguintes campos:
  - App name,
  - User suport email,
  - Developer contact information.

6. Após clicar em **SAVE AND CONTINUE** selecione a sessão **Credentials**.
  <img src="https://i.imgur.com/tRbsrac.png" width="300" height="220">

7. Clique em **Create credentials** e selecione **OAuth client ID**.

8. Em **Application type** selecione **Web App** e escolha um nome para seu client.

9. Na sessão **URIs de redirecionamento autorizados** adicione a seguinte URI [http://localhost:3000/auth/google_oauth2/callback](http://localhost:3000/auth/google_oauth2/callback) e depois clique em **CREATE**.

10. Copie seu **Client ID** e seu **Client secret**.

11. Atualize as seguintes variáveis de ambiente no arquivo `.env`:

```sh
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google_oauth2/callback"
GOOGLE_CLIENT_ID="seu Client ID"
GOOGLE_SECRET="seu Client secret"
```

## Instalando as dependências
- Abra seu terminal e execute o comando
```sh
npm install
```

## Configurando o banco de dados

1. Acesse [https://www.mongodb.com/](https://www.mongodb.com/) e crie uma conta ou acesse sua conta se já tiver uma.

2. Ao criar sua conta, selecione a opção **M0** e escolha um nome para seu cluster e clique em **CREATE**.
  <img src="https://i.imgur.com/6jgr5xl.png" width="300" height="220">

3. Copie o password gerado e guarde para usar no passo **7**.
  <img src="https://i.imgur.com/0lsDC5G.png" width="300" height="220">

4. Clique em **Create user** e depois em **Finish and close**.

5. Clique em **Go to Databases**e clique em **connect**.
  <img src="https://i.imgur.com/NEYRxG9.png" width="300" height="220">

6. Selecione a opção **Drivers** e copie sua string de conexão que estará disponível no ítem 3 e será semelhante a esta:

  ```sh
  mongodb+srv://<user>:<password>@cluster0.<clusterid>.mongodb.net/?retryWrites=true&w=majority
  ``````

7. Substitua <password> pelo password que você armazenou no passo **3** e armazene essa string na variável de ambiente `MONGODB_URI` do arquivo `.env`.

8. No seu terminal digite `mongosh <string-de-conexão>`. Ficará semelhante a este comando:

  ```sh
  mongosh mongodb+srv://<user>:<password>@cluster0.<clusterid>.mongodb.net/?retryWrites=true&w=majority
  ```

## Rodando o projeto
1. Para evitar erros e fazer um update no banco de dados execute o comando `npx browserslist@latest --update-db`

3. Execute o comando `yarn dev` para executar o projeto

4. Acesse [http://localhost:3000](http://localhost:3000)

## Solucionando problemas

Caso você enfrente algum problema, certifique-se de estar utilizando a versão 14.20.1 do node. Você pode verificar sua versão do node utilizando o comando `node -v`. Caso sua versão seja diferente da recomendada para este projeto, instale a versão correta utilizando o comando `nvm install 14.20.1`

Se mesmo assim você continuar tendo problemas, peça ajuda na comunidade do [Discord](https://impulso.link/yvpkDv) ou do [Whatsapp](https://impulso.link/dyolup)
