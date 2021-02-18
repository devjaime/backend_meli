FROM node:latest
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm ci --only=production
COPY . /usr/src/app
EXPOSE 5000
CMD ["npm", "start"]