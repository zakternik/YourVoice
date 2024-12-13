FROM node:18-alpine

WORKDIR /app/rest-api

COPY package*.json ./

RUN npm install

COPY ../.. .

ARG APP_PORT
ARG NODE_ENV

EXPOSE ${APP_PORT}

CMD ["sh", "-c", "npm install && if [ \"${NODE_ENV}\" = dev ]; then npm run start:dev; else npm start; fi"]