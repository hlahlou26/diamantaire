import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    base: '/',
    root: path.resolve(__dirname, 'ecommerce'),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
        postcss: {
            plugins: [autoprefixer],
        },
    },
    server: {
        port: 5173,
        open: true,
    },
    build: {
        outDir: path.resolve(__dirname, 'dist/ecommerce'),
        emptyOutDir: true,
    },
});
