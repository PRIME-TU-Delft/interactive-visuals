FROM docker.io/node:16-alpine

WORKDIR /app
RUN chown node:node /app
USER node

COPY --chown=node:node ./package.json .
COPY --chown=node:node ./yarn.lock .
RUN yarn install --immutable

COPY --chown=node:node . .
RUN yarn build


FROM docker.io/nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
