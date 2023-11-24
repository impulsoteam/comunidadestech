FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .
RUN npx browserslist@latest --update-db

EXPOSE 3000

CMD ["npm", "start"]