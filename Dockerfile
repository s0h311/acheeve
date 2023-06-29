# syntax = docker/dockerfile:1.2

FROM node:18.16.1

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

ARG SUPABASE_SERVICE_KEY
ARG DATABASE_URL

ENV SUPABASE_URL=https://rpoeffpbbnljlyhptgks.supabase.co
ENV SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwb2VmZnBiYm5samx5aHB0Z2tzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgwMjk0MDUsImV4cCI6MjAwMzYwNTQwNX0.vndrqE21cA9y6w6--n4X1vBrmVFyBhAgcvS40Z68TSU"
ENV SUPABASE_SERVICE_KEY=$SUPABASE_SERVICE_KEY
ENV DATABASE_URL=$DATABASE_URL
ENV NITRO_PRESET=node-server

corepack enable
corepack prepare yarn@stable --activate

RUN yarn install

COPY . .

EXPOSE 3000

RUN npx nuxi build

CMD [ "node", ".output/server/index.mjs" ]