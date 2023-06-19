FROM node:18.16.0

WORKDIR /usr/src/app

ENV NITRO_PORT=3000
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PRESET=node-server

COPY package*.json ./

RUN npm install -g npm@9.7.1
RUN npm install

COPY . .

EXPOSE 3000

RUN npx nuxi build

CMD [ "node", ".output/server/index.mjs" ]