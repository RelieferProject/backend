FROM node:16.19-alpine

ENV NODE_ENV=production

RUN apk add --no-cache tzdata
ENV TZ Asia/Bangkok

WORKDIR /app

COPY . .

# RUN apk add --no-cache git

# RUN npm install -g @nestjs/cli@9.0.0

# RUN npm i @types/node

RUN yarn install

RUN yarn build

RUN yarn prisma generate

CMD ["node", "dist/main"]
