# create a file named Dockerfile
FROM node

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

EXPOSE 3000
EXPOSE 5859

CMD ["npm", "start"]Ï