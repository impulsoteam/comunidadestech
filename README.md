![CTech Logo](https://www.comunidades.tech/static/ctech-logo.svg)

[![Maintainability](https://api.codeclimate.com/v1/badges/7c842d991bcd66584f19/maintainability)](https://codeclimate.com/github/universoimpulso/comunidadestech/maintainability)
[![Website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg?label=about)](http://comunidades.tech) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Twitter Follow](https://img.shields.io/twitter/follow/universoimpulso.svg?style=social&label=Follow)](https://twitter.com/UniversoImpulso)

Comunidades.tech é um espaço de visibilidade e fortalecimento das comunidades de tecnologia

## Como colaborar?

### Pré-requsitos

Antes de iniciar, é importante verificar se o seu ambiente possui os requisitos mínimos para rodar:

- Node v10.15.2 ou superior
- Mongo v4.0.13 ou superior
- Yarn v1.19.1 ou superior

### Criando um app teste

O Comunidades.tech utiliza a API do LinkedIn como login para manter os cadastros. Por isso, você precisará criar um app de teste. Siga as instruções abaixo:

1.  Acesse [https://linkedin.com/developers](https://linkedin.com/developers), clique em **Create App** e siga as instruções da tela
2.  No campo RedirectURLs, adicione `http://localhost:3000/auth/linkedin`
3.  Você receberá os campos Client ID e Client Secret. Salve-os parra usar mais tarde.

### Clone do projeto

Faça o fork deste repositório e, em seguida, faça o clone do projeto em sua máquina local

`git clone https://github.com/{your account}/comunidadestech`

Em seguida, na raíz do projeto, crie um arquivo `.env` a partir do `.env.example` e atualize essas variáveis com as suas chaves:

````
LINKEDIN_API_KEY="Seu Client ID"
LINKEDIN_SECRET_KEY="Seu Client Secret"

```Por fim, rode os comandos:

- `yarn` para instalar as dependências
- `yarn test` para rodar alguns testes e popular o DB local com algumas comunidades
- `yarn dev` para abrir o projeto

### Admin user by cli
```shell
# Find user
db.users.find({email: 'USER_EMAIL'})

# Set user as moderator
db.users.updateOne({email: 'USER_EMAIL'}, {$set:{isModerator: true}})
```

### Publish community by cli
```shell
# Find community
db.communities.find({name: 'COMMUNITY_NAME'})

# Set community as published
db.users.updateOne({email: 'USER_EMAIL'}, {$set:{status: 'published'}})
```

## Backup to S3

### Buildpacks requirements: 
```shell
heroku buildpacks:add http://github.com/Lendix/heroku-buildpack-mongo.git -a comunidadestech
```

### Variables
```shell
HEROKU_API_KEY    # heroku authorization

BACKUP_S3_BUCKET  # storage container
BACKUP_S3_KEY     # user key in AWS IAM
BACKUP_S3_SECRET  # user secret key in AWS IAM

BACKUP_APP_NAME   # storage folder name
```

### Backup command
```shell
heroku run ./bin/mongo_dump_to_s3 -a comunidadestech
```

### Restore local
```shell
# Download Backup file
https://s3.console.aws.amazon.com/s3/buckets/hitech-backup-apps?region=us-east-1&prefix=comunidadestech/&showversions=false
# Decompress
tar -xvf NAME_OF_FILE
# Restore backup in mongodb
mongorestore --drop tmp/dump
```

### Restore remote
```shell
https://hitech-backup-apps.s3.us-east-1.amazonaws.com/comunidadestech/comunidadestech-2023-02-28_23_32.tar.gz?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXNhLWVhc3QtMSJGMEQCIEvdS75lDtI%2BC9MXvXSJqh84PjTzaFlaelafCmVJdGSdAiAbawPlzTVyaZ6PIBAPaFk9mYpf%2B1lpcI9YfWWgyEgmpirxAgiN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAQaDDc1MzU2NDc1MjQ4OCIMwGHhO0AhYqvYgtZoKsUC2Dd9lEwS2F4h8XLKr8j6F0H1FrYBcgs2UNm%2BVgESvqGeuLWTLZSFA%2BvsupDPAZHEiVFxvuUQVZ73m%2ByZFtoauAg5u12Sou7AmgYc6qStwi7id7iXwszOw9gAWExTqgYAFJ4h%2FT2ZcJ9JBhUOWTEPE6iaShoBkOtuOJgvoxVu%2FZNcQYEeY6yrOE6bdxzT4lWAZDtbmrHk8j6iqlKiZUprfZ4JvdxsDfl9reNzcwe4X0l%2FIc0p58esYyyv3T2eMwW3q4KhStdbmkC5XpAufKHEYhYHDte4TUXkAqYP6ry3Y50EVtkz4n9mdTUl1wjsCthHOQNULGQaUZkUbHe0K9MBQSlTMscbi9sIf3RsB%2BA1fVLwsEqwDQVLFZKIBabnwlSZCKmKWv%2BBjMHc45GmEynCfCN0ufEBdtH2VpLYGhjk8ggd6ZhSezCn5vWkBjq0AubxxZvXx5uW5nl7GerKNLuJORCnqiXZbs7pep3DioQrZVpSSMEUXBTazNSXchofndpNSa9GRwUMJavV3efOx0YeMv3SzBefNKqm5xzWMTmhArLg%2B%2BOGzLic5XHrNI%2BKM%2ByVDitkTBxsuFWVupKqpOBO0yq9wmH%2FlT%2Bnv%2FdrhW8tXD5ABvIn9xKCjATwZ1mzyCyWOWCidxfXQsDiaghh5YdiOGulHqpDwoPo7%2Fw%2F2IMLYsonuBTrEUZVde2VT8w2dF1OaMwnvzF5wPtbGY5B4tHNod9d2rG01XCMsTzGeIUDV3vXbYU7BPCrZEXv%2BQrOoo8ikMeDjKo71NwnI9tE4zQVMLuLzGv1ADexsJ7tDlOG0Tc0KjTIQ0dRPKPinmxtIkCRPDhE20K4qHkge8PAkvb6h9AY&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230629T181327Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Credential=ASIA2647VTJUGMRVVCN6%2F20230629%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=c6fb95bc5805e9f14159b60e71f51140ef9c53213d6b9a65f14f92f9e607c5ba
```

### References
 - https://www.mongodb.com/docs/database-tools/mongodump/
 - https://www.mongodb.com/docs/database-tools/mongorestore/
 - https://hevodata.com/learn/mongodump/#Step1

## Dúvidas?

Acesse o [chat da comunidade da Impulso](https://impulso.link/discord) e comente no canal #open-source ou abra uma issue nesse projeto.

## Código de Conduta

A Impulso Network adotou um Código de Conduta que esperamos que os participantes do projeto sigam. Por favor, leia [Código de Conduta](CONTRIBUTING.md) para que você possa entender quais ações serão e não serão toleradas.

## Guia de Contribuição

Leia nosso [guia de contribuição](CONTRIBUTING.md) para conhecer nosso processo de desenvolvimento, como propor correções de erros e melhorias, e como construir e testar suas alterações no Atena.

## 📄 License

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE.md](LICENSE.md) para obter detalhes.

## Disclaimer

**Comunidades.tech** é um projeto open source desenvolvido pela comunidade da **[Impulso](https://impulso.link/discord)**.

![](https://camo.githubusercontent.com/0abec20d7187ac743910c67b5b8fadd09d64f069/68747470733a2f2f73332d73612d656173742d312e616d617a6f6e6177732e636f6d2f6173736574732e696d70756c736f2e6e6574776f726b2f696d616765732f696d70756c736f6e6574776f726b2d6c6f676f2e737667)
````


