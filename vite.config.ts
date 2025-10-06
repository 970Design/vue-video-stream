import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: './components/VueVideoStream.vue',
            name: 'VueVideoStream',
            fileName: (format) => `vue-video-stream.${format}.js`,
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
        commonjsOptions: {
            include: [/hls\.js/],
        },
    },
    optimizeDeps: {
        include: ['hls.js'],
    },
});