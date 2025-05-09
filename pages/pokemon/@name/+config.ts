import type { Config } from "vike/types";

const config = {
  // Enable Vue integration
  // extends: "vike-vue",
  // Pass route parameters to the page
  passToClient: ["routeParams"],
} satisfies Config;

export default config;
