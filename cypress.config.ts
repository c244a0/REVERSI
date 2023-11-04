import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    supportFile: "cypress/support/e2e.ts",
    basUrl: "http://52.195.45.7:3000"
  },
});
