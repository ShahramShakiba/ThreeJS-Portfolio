import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default {
  root: 'src/',
  publicDir: '../static/',
  base:'./',
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: 'src/index.html',
    },
  },
  plugins: [wasm(), topLevelAwait()],
  assetsInclude: ['**/*.glb'],
};
