// pages/+onRenderClient.ts
import { createApp } from "./+app/entry";
import type { PageContext } from "vike/types";

export default async function onRenderClient(pageContext: PageContext) {
    const app = createApp(pageContext);
    app.mount("#app");
}
