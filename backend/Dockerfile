FROM node:22
WORKDIR /app

# Install dependencies based on backend package files
COPY package*.json ./
RUN npm install

# Copy backend source code
COPY . .

EXPOSE 5000

CMD ["npm","run","dev"]
