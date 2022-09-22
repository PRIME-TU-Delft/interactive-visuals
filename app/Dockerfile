FROM node:16-alpine

WORKDIR /app
RUN chown node:node /app
USER node

COPY --chown=node:node ./package.json .
COPY --chown=node:node ./yarn.lock .
RUN yarn install --immutable

COPY --chown=node:node . .

CMD [ "yarn", "dev", "--port", "8000" ]
