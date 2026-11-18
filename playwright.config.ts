import { defineConfig } from "@playwright/test";

const baseURL = "http://127.0.0.1:4323";

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.ui.ts",
  outputDir: ".codex-tmp/playwright-results",
  workers: 2,
  reporter: "list",
  use: {
    baseURL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_BROWSER_EXECUTABLE_PATH,
      chromiumSandbox: true
    }
  },
  projects: [
    {
      name: "desktop-light",
      use: { viewport: { width: 1280, height: 900 }, colorScheme: "light" }
    },
    { name: "desktop-dark", use: { viewport: { width: 1280, height: 900 }, colorScheme: "dark" } },
    { name: "mobile-light", use: { viewport: { width: 360, height: 800 }, colorScheme: "light" } },
    { name: "mobile-dark", use: { viewport: { width: 360, height: 800 }, colorScheme: "dark" } }
  ],
  webServer: {
    command: "bun run preview --host 127.0.0.1 --port 4323",
    url: baseURL,
    reuseExistingServer: false,
    timeout: 20000
  }
});
