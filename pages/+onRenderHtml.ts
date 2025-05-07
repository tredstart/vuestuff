import { createVuetify } from "vuetify";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import type { PageContext } from "vike/types";
import { escapeInject } from "vike/server";

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

  return {
    documentHtml: escapeInject`<!DOCTYPE html>
      <html>
        <head>
          <title>Pokedeez</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css">
        </head>
        <body>
          <div id="app"></div>
        </body>
      </html>`,
    pageContext: {
      vuetify,
      Page: pageContext.Page,
      passToClient: ["vuetify", "Page"],
    },
  };
}
