FROM node:lts-alpine as build  
WORKDIR /app  
COPY package.json package-lock.json ./  
RUN npm ci  
COPY . .  
RUN npm run build  
  
FROM nginx:stable-alpine  
COPY --from=build /app/build /usr/share/nginx/html  
COPY nginx.conf /etc/nginx/nginx.conf  
EXPOSE 80  
CMD ["nginx", "-g", "daemon off;"]
