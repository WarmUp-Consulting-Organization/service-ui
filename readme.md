# UI service for Report Portal 
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![stackoverflow](https://img.shields.io/badge/reportportal-stackoverflow-orange.svg?style=flat)](http://stackoverflow.com/questions/tagged/reportportal)

[![Build](https://github.com/reportportal/service-ui/actions/workflows/build.yml/badge.svg)](https://github.com/reportportal/service-ui/actions/workflows/build.yml)
[![Code Coverage](https://codecov.io/gh/reportportal/service-ui/branch/master/graph/badge.svg)](https://codecov.io/gh/reportportal/service-ui)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/reportportal/service-ui?sort=semver)](https://github.com/reportportal/service-ui/releases/latest)
[![Docker Pulls](https://img.shields.io/docker/pulls/reportportal/service-ui.svg?maxAge=159200)](https://hub.docker.com/r/reportportal/service-ui/)

1. Install nodejs (minimum required version 10)

2. Open console from the project root

3. Run the command `cd app`

4. Run the command `npm install`

5. Create file `.env` in `app` folder

```
PROXY_PATH='' // http://you_server:port/
```

6. Run command `npm run dev`

7. Open `http://localhost:3000/` in browser










apendice


🛠️ 1. Baixar a UI do Report Portal no Windows
No Windows, abra o Git Bash ou PowerShell e execute:

bash
Copiar
Editar
git clone https://github.com/reportportal/service-ui.git
cd service-ui

🔨 2. Construir a nova imagem Docker no Windows
Depois de fazer suas alterações na UI, construa a nova imagem Docker:

bash
Copiar
Editar
docker build -t reportportal-custom-ui .
Verifique se a imagem foi criada corretamente:

bash
Copiar
Editar
docker images | grep reportportal-custom-ui


📦 3. Publicar a imagem no Docker local no Windows
Para armazenar a imagem no registro local, rode um registro Docker privado na máquina Windows:

bash
Copiar
Editar
docker run -d -p 5000:5000 --name registry registry:2
Agora, marque a imagem para ser enviada ao registro local:

bash
Copiar
Editar
docker tag reportportal-custom-ui localhost:5000/reportportal-custom-ui
Agora faça o push para o registro local:

bash
Copiar
Editar
docker push localhost:5000/reportportal-custom-ui
Verifique se a imagem está armazenada:

bash
Copiar
Editar
curl http://localhost:5000/v2/_catalog

✏️ 4. Configurar o Docker no Linux para consumir a nova imagem
Agora, na máquina Linux, você precisa configurar o docker-compose.yml para usar essa nova imagem.

Acesse a pasta onde o Report Portal está rodando no Linux:

bash
Copiar
Editar
cd /caminho/do/reportportal
Edite o arquivo docker-compose.yml com um editor de texto:

bash
Copiar
Editar
nano docker-compose.yml
Encontre a configuração do serviço index e altere para usar sua imagem:

yaml
Copiar
Editar
index:
  image: localhost:5000/reportportal-custom-ui
  container_name: rp_index
  restart: always
Salve (CTRL + X, depois Y e Enter).

🔄 5. Baixar e subir a nova imagem no Docker do Linux
Agora no Linux, faça login no Docker Hub do Windows para acessar a imagem:

bash
Copiar
Editar
docker login localhost:5000
Baixe a imagem do seu repositório local do Windows para o Docker no Linux:

bash
Copiar
Editar
docker pull localhost:5000/reportportal-custom-ui
Agora suba os containers com a nova UI:

bash
Copiar
Editar
docker-compose up -d --force-recreate

service-ui:
  image: reportportal/service-ui:latest
Alteração para usar sua nova imagem:

yaml
Copiar
Editar
service-ui:
  image: reportportal-custom-ui:latest

  siga todos os passos e chegara no pote de ouro
