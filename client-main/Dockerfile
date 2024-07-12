# Usar uma imagem oficial do Node.js como imagem base
FROM node:16-alpine

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o conteúdo do diretório atual para o container no diretório /app
COPY . /app

# Build da aplicação
RUN npm run build

# Instalar http-server para servir a aplicação construída
RUN npm install -g http-server

# Expor a porta 5173
EXPOSE 5173

# Comando para rodar a aplicação na porta 5173
CMD ["http-server", "/app/dist", "-p", "5173"]
