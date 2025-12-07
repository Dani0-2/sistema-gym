FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Vite normalmente usa 5173
EXPOSE 5173

# VITE_API_URL apuntará al servicio "backend" del docker-compose
ENV VITE_API_URL=http://localhost:4000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]