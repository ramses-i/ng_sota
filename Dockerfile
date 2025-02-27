# Stage 1: Build Angular application
FROM node:22.12.0-alpine AS build
WORKDIR /code
COPY . ./
RUN npm install
RUN npx nx build

# Stage 2: Serve with NGINX on port 5173
FROM nginx:stable-alpine AS production
COPY --from=build /code/dist/ng_sota/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
