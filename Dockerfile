FROM nginx:latest
WORKDIR /usr/share/nginx/html

COPY  docker-entrypoint.sh /docker-entrypoint2.sh
COPY  nginx.conf.template /
COPY  ./dist /usr/share/nginx/html




ENTRYPOINT ["sh", "/docker-entrypoint2.sh"]
CMD ["nginx","-g","daemon off;"]
