FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 5000
ENV HOST=0.0.0.0

CMD [ "npm", "run", "dev" ]