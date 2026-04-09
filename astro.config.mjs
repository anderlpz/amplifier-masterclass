import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  base: '/masterclass-preview/',
  integrations: [react()],
  devToolbar: { enabled: false },
  server: {
    host: '0.0.0.0',
    port: 4322,
  },
  vite: {
    server: {
      allowedHosts: ['localhost'],
    },
  },
});
