// pages/+app/entry.ts
import { createSSRApp, h } from "vue";
import { VueQueryPlugin } from '@tanstack/vue-query';
import { vuetify } from "../../renderer/vuetify";
import { PageContext } from "vike/types";

export function createApp(pageContext: PageContext) {
    const app = createSSRApp({
        render: () => h(pageContext.Page, { pageContext }),
    });
    app.use(VueQueryPlugin);
    app.use(vuetify);
    return app;
}
