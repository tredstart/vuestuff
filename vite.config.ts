import md from "unplugin-vue-markdown/vite";
import vue from "@vitejs/plugin-vue";
import vercel from "vite-plugin-vercel";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
    plugins: [
        vike(),
        vercel(),
        vue({
            include: [/\.vue$/, /\.md$/],
        }),
        md({}),
        vuetify({ autoImport: true }),
    ],
    build: {
        target: "es2022",
    },
    ssr: {
        // Add problematic npm package here:
        noExternal: ['vuetify']
    }
});
