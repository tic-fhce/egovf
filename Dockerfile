FROM node:18-alpine

WORKDIR /egovf

COPY package*.json ./

RUN npm install

COPY . .

# Exposición del puerto en el contenedor
EXPOSE 8080

# Comando por defecto al ejecutar el contenedor
CMD ["npm", "run", "serve"]
