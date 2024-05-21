FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install -g @angular/cli
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/sistema-projetos /usr/share/nginx/html


#docker build -t sistemaProjetos .
#docker run -p 8081:80 sistemaProjetos
