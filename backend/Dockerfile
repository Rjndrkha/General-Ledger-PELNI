# Gunakan image Node versi terbaru sebagai dasar
FROM node:18

# Install dependencies untuk Oracle Instant Client
RUN apt-get update && apt-get install -y \
    unzip \
    libaio1 \
    curl

# Buat direktori untuk Oracle Instant Client
RUN mkdir -p /opt/oracle/instantclient

# Download dan extract Oracle Instant Client
RUN curl -o instantclient.zip https://download.oracle.com/otn_software/linux/instantclient/2350000/instantclient-basic-linux.x64-23.5.0.24.07.zip && \
    unzip instantclient.zip -d /opt/oracle/instantclient && \
    rm instantclient.zip && \
    mv /opt/oracle/instantclient/instantclient_23_5/* /opt/oracle/instantclient/ && \
    rmdir /opt/oracle/instantclient/instantclient_23_5

# Set environment variable untuk library
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient

# Jalankan ldconfig untuk menambahkan library ke sistem
RUN echo /opt/oracle/instantclient > /etc/ld.so.conf.d/oracle-instantclient.conf && ldconfig

# Set direktori kerja di container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin seluruh kode aplikasi ke dalam container
COPY . .

# Ekspos port aplikasi
EXPOSE 4000

# Jalankan aplikasi
CMD ["npm", "start"]
