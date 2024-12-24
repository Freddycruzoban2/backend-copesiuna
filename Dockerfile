# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que la aplicación correrá
EXPOSE 3003

# Comando para correr la aplicación
CMD ["npm", "start"]