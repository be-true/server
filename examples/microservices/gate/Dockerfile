FROM cr.yandex/crpjm5kdvh71hdgvosib/node:16-alpine
WORKDIR /app
COPY ./lib_server ./lib_server
COPY ./package.json ./package-lock.json ./
RUN npm ci --production
COPY ./gate ./gate
ENTRYPOINT [ "node", "./gate" ]