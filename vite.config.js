import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },

  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        login: 'login.html',
        register: 'register.html',
        detail: 'detail.html',
        fiyatlar: 'fiyatlar.html',
        hakkimizda: 'hakkimizda.html',
        hesabim: 'hesabim.html',
        kategoriler: 'kategoriler.html',
        paneller: 'paneller.html',
        support: 'support.html',
        admin: 'admin.html',
        payment: 'payment.html',
        panelmarket: 'panelmarket.html'
      }
    }
  }
});

// PanelMarket Vercel multi-page build
