FROM node:latest as base

WORKDIR /usr/src/app
COPY package.json /usr/src/app

FROM base as test
RUN npm install
COPY . /usr/src/app
RUN npm run test

FROM base as prod
RUN npm install
COPY . /usr/src/app
CMD ["npm", "start"]