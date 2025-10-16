FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# No copiamos el código aún, porque lo montaremos como volumen
EXPOSE 3000

CMD ["yarn", "start:dev"]
