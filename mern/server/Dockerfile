FROM node:16
WORKDIR /usr/src/server
COPY package*.json ./
RUN npm install 

COPY . .
EXPOSE 5000

CMD ["node", "server.js"]