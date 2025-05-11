import md from "unplugin-vue-markdown/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import vuetify from "vite-plugin-vuetify";

export default defineConfig({
  plugins: [
    vike(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vuetify({ autoImport: true }),
    md({}),
  ],
  build: {
    target: "es2022",
  },
  ssr: {
    noExternal: ["vuetify", "vuetify/components", "vuetify/directives"],
  },
});
