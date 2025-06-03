import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  if (mode === "app") {
    return {
      plugins: [react(), tsconfigPaths()],
      build: {
        rollupOptions: {
          input: "./src/@app/_app.tsx",
          output: {
            dir: "dist/app",
            chunkFileNames: "app.js",
            entryFileNames: "app.js",
            assetFileNames: () => "app[extname]",
          },
        },
      },
    };
  } else {
    return {
      preview: {
        port: 4179,
        strictPort: true,
      },
      plugins: [
        react(),
        tsconfigPaths(),
        federation({
          name: "configs",
          filename: "remoteEntry.js",
          exposes: {
            "./Configs": "./src/@configs/Configs.tsx",
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
      build: {
        modulePreload: false,
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
      },
    };
  }
});
