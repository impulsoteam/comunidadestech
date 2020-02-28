![CTech Logo](https://www.comunidades.tech/static/ctech-logo.svg)

[![Website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg?label=about)](http://comunidades.tech) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Twitter Follow](https://img.shields.io/twitter/follow/universoimpulso.svg?style=social&label=Follow)](https://twitter.com/UniversoImpulso)

Comunidades.tech é um espaço de visibilidade e fortalecimento das comunidades de tecnologia

## Como colaborar?

### Pré-requsitos

Antes de iniciar, é importante verificar se o seu ambiente possui os requisitos mínimos para rodar:

- Node v10.15.2 ou superior
- Mongo v4.0.13 ou superior
- Yarn v1.19.1 ou superior

Ou instale o Docker e Docker-Compose

- https://docs.docker.com/install/
- https://docs.docker.com/compose/install/

### Criando um app teste

O Comunidades.tech utiliza a API do LinkedIn como login para manter os cadastros. Por isso, você precisará criar um app de teste. Siga as instruções abaixo:

1.  Acesse [https://linkedin.com/developers](https://linkedin.com/developers), clique em **Create App** e siga as instruções da tela
2.  No campo RedirectURLs, adicione `http://localhost:3000/auth/linkedin`
3.  Você receberá os campos Client ID e Client Secret. Salve-os parra usar mais tarde.

### Clone do projeto

Faça o fork deste repositório e, em seguida, faça o clone do projeto em sua máquina local

`git clone https://github.com/{your account}/comunidadestech`

Em seguida, na raíz do projeto, crie um arquivo `.env` a partir do `.env.example` e atualize essas variáveis com as suas chaves:

```
LINKEDIN_API_KEY="Seu Client ID"
LINKEDIN_SECRET_KEY="Seu Client Secret"

```

Por fim, rode os comandos:

- `yarn` para instalar as dependências
- `yarn test` para rodar alguns testes e popular o DB local com algumas comunidades
- `yarn dev` para abrir o projeto

Ou se preferir o Docker, rode:

- `docker-compose up` para instalar as dependências e abrir o projeto
- `docker exec -it ctech-web bash -c "yarn test"` para rodar alguns testes e popular o DB local com algumas comunidades

Logo após o app estará disponível em `http://localhost:3000`

## Dúvidas?

Acesse o [chat da comunidade da Impulso Network](https://impulso.network/entrar) e comente no canal #open-source ou abra uma issue nesse projeto.

## Código de Conduta

A Impulso Network adotou um Código de Conduta que esperamos que os participantes do projeto sigam. Por favor, leia [Código de Conduta](CONTRIBUTING.md) para que você possa entender quais ações serão e não serão toleradas.

## Guia de Contribuição

Leia nosso [guia de contribuição](CONTRIBUTING.md) para conhecer nosso processo de desenvolvimento, como propor correções de erros e melhorias, e como construir e testar suas alterações no Atena.

## 📄 License

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE.md](LICENSE.md) para obter detalhes.

## Disclaimer

**Comunidades.tech** é um projeto open source desenvolvido pela comunidade da **[Impulso.Network](https://impulso.link/comunidades-tech)**.

![](https://camo.githubusercontent.com/0abec20d7187ac743910c67b5b8fadd09d64f069/68747470733a2f2f73332d73612d656173742d312e616d617a6f6e6177732e636f6d2f6173736574732e696d70756c736f2e6e6574776f726b2f696d616765732f696d70756c736f6e6574776f726b2d6c6f676f2e737667)
