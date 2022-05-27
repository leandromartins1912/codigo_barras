# Iniciando o Projeto
Este Projeto foi desenvolvido com nodejs e ts. <img height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg" />

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm install`
### `npm run dev`

## Aplicação Local

<h3>O parâmetro informado deve ser um código de barras.</h3>

Executa o aplicativo no modo de desenvolvimento.\
Abra http://localhost:4000/boleto/parâmetro. No Postman/insomnia.

## Execução de testes

No diretório do projeto executar o comando npm test ou yarn test para execução dos testes unitários.

## Docker <img height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />

Para rodar a imagem docker, no diretório aplique o comando docker-compose up.

## Heroku

### Parâmentro - Código de Barras

Api pode ser testada no link https://validador-codigo-barras.herokuapp.com/boleto/parâmetro

response

status:200
{
    "codigoBarras": "10494899100000545018370397031115040003306114",
    "valor": 545.01,
    "vencimento": "2022-05-20"
}

<img align="center" alt="Heroku" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg" />
