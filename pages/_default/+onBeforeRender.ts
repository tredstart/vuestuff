import { render } from "vike/abort";

// pages/_default/+onBeforeRender.ts
export { onBeforeRender };
function onBeforeRender() {
  throw render(404);
}
