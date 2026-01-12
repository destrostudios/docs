FROM nginx:1.27.0-alpine
COPY app.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
