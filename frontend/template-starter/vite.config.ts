import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import packageJson from './package.json';

const BASE_PATH = `/apps/${packageJson.name}`;

export default defineConfig(({ mode }) => {
  if (mode === 'app') {
    return {
      plugins: [react(), tsconfigPaths()],
      build: {
        rollupOptions: {
          input: './src/@app/_app.tsx',
          output: {
            dir: 'dist/app',
            chunkFileNames: 'app.js',
            entryFileNames: 'app.js',
            assetFileNames: () => 'app[extname]',
          },
        },
      },
    };
  } else {
    return {
      base: BASE_PATH,
      preview: {
        port: 4177,
        strictPort: true,
      },
      plugins: [
        react(),
        tsconfigPaths(),
        federation({
          name: 'configs',
          filename: 'remoteEntry.js',
          exposes: {
            './Configs': './src/@configs/Configs.tsx',
          },
          shared: [
            '@emotion/react',
            '@emotion/styled',
            '@mui/lab',
            '@mui/material',
            '@mui/x-data-grid-premium',
            '@mui/x-date-pickers-pro',
            'react',
            'react-dom',

            '@mui/material/Tooltip',
            '@mui/material/Popper',
          ],
        }),
      ],
      build: {
        modulePreload: false,
        target: 'esnext',
        minify: false,
        cssCodeSplit: false,
      },
    };
  }
});
