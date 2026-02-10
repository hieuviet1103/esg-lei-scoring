import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5173,
    // Allow access from custom domains/IPs
    allowedHosts: [
      'test-3.hivietravel.vn',
      '.hivietravel.vn', // Allow all *.hivietravel.vn subdomains
      'localhost',
      '127.0.0.1',
    ],
    proxy: {
      '/api': {
        target:  'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ''), // Không cần rewrite vì backend đã có /api prefix
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Proxying:', req.method, req.url, '->', proxyReq.path);
          });
        },
      },
    },
  },
});

