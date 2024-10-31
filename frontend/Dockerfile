# Gunakan node:18-alpine sebagai base image untuk ukuran yang ringan
FROM node:18-alpine

# Set direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json ke container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode aplikasi ke dalam container
COPY . .

# Build aplikasi untuk produksi
RUN npm run build

# Install server statis sederhana untuk melayani file React
RUN npm install -g serve

# Ekspose port 3000
EXPOSE 3000

# Jalankan server statis di port 3000
CMD ["serve", "-s", "build", "-l", "3000"]
