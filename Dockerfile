FROM nginx:alpine

LABEL maintainer="Raphael"
LABEL version=5.7.4

ENV APP_DOWNLOAD_URL https://github.com/WarmUp-Consulting-Organization/service-ui/releases/download/v0.3

ADD ${APP_DOWNLOAD_URL}/ui.tar.gz /

RUN tar -zxvf ui.tar.gz -C /usr/share/nginx/html && rm -f ui.tar.gz
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
