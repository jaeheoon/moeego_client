FROM node:lts-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
# nginx의 html 디렉토리를 먼저 생성
RUN mkdir -p /usr/share/nginx/html
# 그 다음 빌드된 파일을 복사
COPY --from=build /app/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
