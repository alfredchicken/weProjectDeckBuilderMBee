FROM node:22
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
WORKDIR /app
EXPOSE 5173
CMD ["npm","run","dev","--","--host","0.0.0.0"]