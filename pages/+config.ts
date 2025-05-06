import vikeVue from "vike-vue/config";
import type { Config } from "vike/types";
import vikeVueQuery from "vike-vue-query/config";
import Layout from "../layouts/LayoutDefault.vue";

export default {
  Layout,
  title: "shitty weather app",
  description: "i don't know what i'm doing",
  extends: [vikeVue, vikeVueQuery],
  prerender: true,
} satisfies Config;
