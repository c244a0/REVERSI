import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    supportFile: "cypress/support/e2e.ts"
  },
});
