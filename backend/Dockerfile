FROM node:alpine

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

ADD bin ./bin
ADD src ./src

CMD [ "./node_modules/.bin/nodemon", "-L" ]