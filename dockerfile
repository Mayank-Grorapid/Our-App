
FROM node:18
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --ignore-engines
COPY . .
RUN yarn build 
RUN yarn build 
EXPOSE 3000
CMD ["node", "dist/main"]
