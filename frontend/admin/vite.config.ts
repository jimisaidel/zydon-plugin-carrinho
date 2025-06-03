import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  preview: {
    port: 4175,
    strictPort: true,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    federation({
      name: "host",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      remotes: {
        dummy: "dummy.js",
      },
      shared: [
        "@emotion/react",
        "@emotion/styled",
        "@mui/lab",
        "@mui/material",
        "@mui/x-data-grid-premium",
        "@mui/x-date-pickers-pro",
        "@zydon/common",
        "react",
        "react-dom",
        "react-hook-form",

        "@mui/material/Tooltip",
        "@mui/material/Popper",
      ],
    }),
  ],
  esbuild: {
    supported: {
      "top-level-await": true,
    },
  },
});
