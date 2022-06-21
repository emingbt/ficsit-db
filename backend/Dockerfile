FROM node:alpine

WORKDIR /run-the-world

COPY . /run-the-world

RUN npm install -g nodemon

ADD package.json package-lock.json ./

RUN npm install

ADD bin ./bin
ADD src ./src

CMD [ "nodemon" ]