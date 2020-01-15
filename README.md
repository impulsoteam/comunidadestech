![CTech Logo](https://www.comunidades.tech/static/ctech-logo.svg)

Comunidades.tech é um espaço de visibilidade e fortalecimento das comunidades de tecnologia

## Como colaborar?

### Pré-requsitos

Antes de iniciar, é importante verificar se o seu ambiente possui os requisitos mínimos para rodar:
 - Node v10.15.2 ou superior
 - Mongo v4.0.13 ou superior
 - Yarn v1.19.1 ou superior
 
### Criando um app teste

O Comunidades.tech utiliza a API do LinkedIn como login para manter os cadastros. Por isso, você precisará criar um app de teste. Siga as instruções abaixo:
 1. Acesse [https://linkedin.com/developers](https://linkedin.com/developers), clique em **Create App** e siga as instruções da tela
 2. No campo RedirectURLs, adicione `http://localhost:3000/auth/linkedin`
 3. Você receberá os campos Client ID e Client Secret. Salve-os parra usar mais tarde.
 
### Clone do projeto

Faça o fork deste repositório e, em seguida, faça o clone do projeto em sua máquina local 

`git clone https://github.com/{your account}/comunidadestech`

Em seguida, na raíz do projeto, crie um arquivo `.env` nesse formato:

```
MONGODB_URI="mongodb://localhost/ctech"  
MONGODB_TEST_URI="mongodb://localhost/ctech"  
PORT=3000  
NODE_ENV="development"  
GOOGLE_CLIENT_ID=""  
GOOGLE_SECRET=""  
GOOGLE_CALLBACK_URL=""  
LINKEDIN_API_KEY="Seu Client ID"  
LINKEDIN_SECRET_KEY="Seu Client Secret"  
LINKEDIN_CALLBACK_URL="[http://localhost:3000/auth/linkedin](https://slack-redir.net/link?url=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Flinkedin)"  
JWT_SECRET_KEY="qualquer string aleatoria"
```

Por fim, rode os comandos:

 - `yarn` para instalar as dependências
 - `yarn test` para rodar alguns testes e popular o DB local com algumas comunidades
 - `yarn dev` para abrir o projeto
 
## Dúvidas?
Acesse o [chat da comunidade da Impulso Network](https://impulso.network/entrar) e comente no canal #open-source ou abra uma issue nesse projeto.

## Disclaimer

**Comunidades.tech** é um projeto open source desenvolvido pela comunidade da  **[Impulso.Network](https://impulso.link/comunidades-tech)**.

![](https://camo.githubusercontent.com/0abec20d7187ac743910c67b5b8fadd09d64f069/68747470733a2f2f73332d73612d656173742d312e616d617a6f6e6177732e636f6d2f6173736574732e696d70756c736f2e6e6574776f726b2f696d616765732f696d70756c736f6e6574776f726b2d6c6f676f2e737667)
