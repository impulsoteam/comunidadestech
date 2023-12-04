FROM ubuntu:22.04

RUN apt update && apt install -y nginx

COPY . /comunidadestech

CMD ["nginx", "-g", "daemon off;"]
