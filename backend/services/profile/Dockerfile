FROM node:10.4-alpine

ENV NODE_ENV production

RUN npm i -g pnpm &&\
    mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN pnpm install

EXPOSE 3000

CMD [ "npm", "start" ]
