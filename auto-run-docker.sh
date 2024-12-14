#!/bin/bash

# Navigasi ke direktori aplikasi dan hapus semua file di folder tertentu
echo "Navigating to /home/rakha/ppd-enterprise-file/general-ledger and cleaning up..."
cd /home/rakha/ppd-enterprise-file/general-ledger || exit
sudo find . -mindepth 1 -delete

# Navigasi ke direktori proyek
echo "Navigating to /home/rakha/General-Ledger-PELNI directory..."
cd /home/rakha/General-Ledger-PELNI/ || exit

# Hentikan semua layanan Docker
echo "Stopping Docker services..."
docker-compose down

# Menghapus semua image Docker yang ada
echo "Removing all Docker images..."
docker rmi -f $(docker images -q)

# Tarik perubahan terbaru dari Git
echo "Pulling latest changes from Git..."
git pull origin main

# Membangun ulang dan menjalankan layanan Docker
echo "Building and starting Docker services..."
docker-compose up --build
