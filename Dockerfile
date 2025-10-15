# ---- Etapa 1: Build ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


# ---- Etapa 2: Servir con Nginx ----
FROM nginx:stable-alpine


# Copiar configuración personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos compilados
COPY --from=build /app/dist /usr/share/nginx/html



EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
