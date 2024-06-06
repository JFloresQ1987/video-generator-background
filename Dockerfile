FROM node:20.13-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8000
CMD [ "npm", "run", "server" ]