import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // O index.html fica na raiz do projeto e importa os arquivos de
  // www/frontend/ (css e js) como parte do grafo de módulos do Vite —
  // isso é necessário para que o import do supabase-js funcione.
  plugins: [react()],
  root: '.',
  base: './',
  publicDir: false,
  build: {
    // O Capacitor está configurado (capacitor.config.json -> webDir) para
    // ler o app pronto de www/dist. Mantemos o build saindo exatamente ali.
    outDir: 'www/dist',
    emptyOutDir: true
  },
  server: {
    port: 5173,
    open: true
  }
});