import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  base: '/masterclass-preview/',
  devToolbar: { enabled: false },
  server: {
    host: '0.0.0.0',
    port: 4322,
  },
  vite: {
    server: {
      allowedHosts: process.env.ALLOWED_HOSTS?.split(',') ?? [],
    },
  },
});
