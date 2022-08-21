FROM node:16.17.0-alpine3.16
WORKDIR /app
COPY ./lib_server ./lib_server
COPY ./package.json ./package-lock.json ./
RUN npm ci --production
COPY ./chat ./chat
ENTRYPOINT [ "node", "./chat" ]