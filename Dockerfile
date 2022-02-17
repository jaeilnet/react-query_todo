FROM node:16-alpine

WORKDIR /todo/json-todo

RUN yarn install
RUN yarn global add json-server

COPY package*.json ./

# 앱 소스 추가
COPY . .

ENTRYPOINT [ "yarn" ]

CMD ["server"]