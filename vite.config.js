import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      // Nur die Spielregeln zählen für die 80 %. Die Oberfläche (App.jsx) wird von Hand im Browser getestet.
      include: ['src/**/*.{js,jsx}'], exclude: ['src/main.jsx'],
      thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 },
    },
  },
});
