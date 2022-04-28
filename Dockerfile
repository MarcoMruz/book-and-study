FROM node:14.18 as builder 

WORKDIR /book-and-study

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

# tak ako spustas frontend
CMD [ "yarn", "start" ]