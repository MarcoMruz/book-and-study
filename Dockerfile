FROM node:16 

WORKDIR /book-and-study

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]