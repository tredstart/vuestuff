import { createVuetify } from "vuetify";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import type { PageContext } from "vike/types";
import { renderToString } from "vue/server-renderer";
import { createSSRApp, h } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { escapeInject, dangerouslySkipEscape } from "vike/server";

export { onRenderHtml };

async function onRenderHtml(pageContext: PageContext) {
  const vuetify = createVuetify({
    components,
    directives,
    theme: { defaultTheme: "light" },
    defaults: {
      VTable: {},
    },
  });

  const app = createSSRApp({
    setup() {
      return () => h(pageContext.Page, { pageContext });
    },
  });
  app.use(vuetify);
  app.use(VueQueryPlugin);

  const appHtml = await renderToString(app);

  return {
    documentHtml: escapeInject`<!DOCTYPE html>
      <html>
        <head>
          <title>Pokedeez</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css">
        </head>
        <body>
          <div id="app">${dangerouslySkipEscape(appHtml)}</div>
        </body>
      </html>`,
    pageContext: {
      vuetify,
      Page: pageContext.Page,
      routeParams: pageContext.routeParams,
      passToClient: ["vuetify", "Page", "routeParams"],
    },
  };
}
