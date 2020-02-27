# Stage 1 - the build process
FROM node:13.8.0 as build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.17.8-alpine
RUN rm -rf /etc/nginx/conf.d
COPY --from=build /usr/src/app/conf /etc/nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
