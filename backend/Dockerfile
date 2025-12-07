FROM node:20-alpine

WORKDIR /app

# Copiamos package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalamos dependencias (incluye devDependencies para ts-node-dev)
RUN npm install

# Copiamos el resto del código
COPY . .

# Variables de entorno
ENV PORT=4000

EXPOSE 4000

# Comando para modo desarrollo
CMD ["npm", "run", "dev"]