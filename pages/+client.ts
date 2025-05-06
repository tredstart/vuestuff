import { createApp } from "vue";
import type { PageContext } from "vike/types";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import { VueQueryPlugin } from '@tanstack/vue-query';

export { onRenderClient };

async function onRenderClient({
    Page,
    pageContext,
}: {
    Page: any;
    pageContext: PageContext & { vuetify: any };
}) {
    const vuetify = createVuetify({
        components,
        directives,
        theme: { defaultTheme: "light" },
        defaults: {
            VTable: {},
        },
    });

    const app = createApp(Page, { pageContext });
    app.use(VueQueryPlugin);
    app.use(vuetify);
    app.mount("#app");

    // For debugging
    console.log("App mounted with Page:", Page);
    console.log("PageContext:", pageContext);
}
