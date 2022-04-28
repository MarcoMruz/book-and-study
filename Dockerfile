FROM node:16

WORKDIR /src

COPY . .

RUN yarn

EXPOSE 3000
CMD [ "yarn", "start" ]