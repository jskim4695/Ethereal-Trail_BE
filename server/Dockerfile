FROM node:22-alpine3.20

ARG DATABASE_URL

ENV DATABASE_URL=${DATABASE_URL}
ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PORT=${REDIS_PORT}
ENV JWT_SECRET=${JWT_SECRET}
ENV JWT_EXPIRES_IN=${JWT_EXPIRES_IN}

WORKDIR /app

COPY package.json ./

RUN npm install
# 파일 접근 권한 옵션 추가
COPY --chown=node:node . .
# 프리즈마 제너레이트 스트립트
RUN npm run prisma:generate

EXPOSE 3000

CMD ["npm", "start"]