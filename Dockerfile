FROM node:14-alpine3.14

WORKDIR /var/www

COPY ["./package.json", "./yarn.lock", "/var/www/"]
RUN yarn install
COPY . /var/www

EXPOSE 3000

CMD ["yarn", "start"]
