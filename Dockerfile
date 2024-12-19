# Nginx 이미지를 베이스로 사용
FROM nginx:stable-alpine

# 기존 nginx 설정 파일 삭제
RUN rm /etc/nginx/conf.d/default.conf

# 커스텀 nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/

# 빌드된 파일들을 nginx의 서비스 디렉토리로 복사
COPY dist /usr/share/nginx/html

# 5173 포트 오픈
EXPOSE 5173