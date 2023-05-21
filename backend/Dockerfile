FROM node:latest

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

CMD ["npm", "run", "dev"]
