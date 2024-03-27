import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from "vite-tsconfig-paths";
import AutoImport from 'unplugin-auto-import/vite';
import { alias } from './vitest.aliases';


export default defineConfig({
    resolve: { alias },
    plugins: [AutoImport({
        imports: [
            'vue',
            'vue-router',
            '@vueuse/core'
            // could add 'vue-router' or 'vitest', whatever else you need.
        ],
        dirs: ['./composables'],
    }), tsconfigPaths(), vue()],
    test: {
        globals: true,
        environment: 'jsdom',
    },
})