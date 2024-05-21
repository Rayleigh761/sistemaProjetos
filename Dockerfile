FROM node:lts-alpine as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build


FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf


#docker build -t sistemaProjetos .
#docker run -p 8081:80 sistemaProjetos
