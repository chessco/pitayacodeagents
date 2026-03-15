FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma Client (Expects schema.prisma inside prisma)
RUN npx prisma generate

EXPOSE 3010

CMD ["npm", "run", "start:dev"]
