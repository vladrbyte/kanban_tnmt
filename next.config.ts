import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',              // Включает экспорт в статический HTML
  basePath: '/kanban_tnmt',      // Указывает базовый адрес вашего репозитория
  images: {
    unoptimized: true,           // Отключает серверную оптимизацию картинок (на GH Pages нет Node.js сервера)
  },
};

export default nextConfig;
