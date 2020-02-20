FROM node:12 as builder

WORKDIR /app

COPY package*.json /app/

COPY . /app/

RUN npm install && \
    npm run build-prod

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /app/www
