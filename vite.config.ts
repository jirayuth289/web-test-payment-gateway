import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Core aliases
      '@/core': path.resolve(__dirname, './src/core'),
      '@/core/api': path.resolve(__dirname, './src/core/api'),
      '@/core/store': path.resolve(__dirname, './src/core/store'),
      '@/core/types': path.resolve(__dirname, './src/core/types'),
      '@/core/utils': path.resolve(__dirname, './src/core/utils'),
      '@/core/constants': path.resolve(__dirname, './src/core/constants'),
      // Features aliases
      '@/features': path.resolve(__dirname, './src/features'),
      '@/features/dashboard': path.resolve(
        __dirname,
        './src/features/dashboard'
      ),
      '@/features/calendar': path.resolve(__dirname, './src/features/calendar'),
      '@/features/booking': path.resolve(__dirname, './src/features/booking'),
      '@/features/car-management': path.resolve(
        __dirname,
        './src/features/car-management'
      ),
      '@/features/reports': path.resolve(__dirname, './src/features/reports'),
      // Shared aliases
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/shared/components': path.resolve(__dirname, './src/shared/components'),
      '@/shared/hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@/shared/utils': path.resolve(__dirname, './src/shared/utils'),
      '@/shared/types': path.resolve(__dirname, './src/shared/types'),
      '@/shared/constants': path.resolve(__dirname, './src/shared/constants'),
      // App aliases
      '@/app': path.resolve(__dirname, './src/app'),
      '@/app/components': path.resolve(__dirname, './src/app/components'),
      '@/app/providers': path.resolve(__dirname, './src/app/providers'),
      '@/app/router': path.resolve(__dirname, './src/app/router'),
      '@/app/store': path.resolve(__dirname, './src/app/store'),
    },
  },
});
