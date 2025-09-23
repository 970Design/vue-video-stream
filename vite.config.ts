import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: './components/VueVideoStream.vue', // Your library's entry point
            name: 'VueVideoStream',
            fileName: (format) => `vue-video-stream.${format}.js`,
        },
        rollupOptions: {
            external: ['vue'], // Exclude Vue from the bundle
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});