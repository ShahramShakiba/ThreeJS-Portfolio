import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default {
  root: 'src/',
  publicDir: '../static/',
  base: './',
  plugins: [wasm(), topLevelAwait()],
};

/* 
- npm i vite-plugin-wasm
- npm i vite-plugin-top-level-await
- npm i @dimforge/rapier3d
https://rapier.rs
Rapier is a set of 2D and 3D physics engines written using the Rust programming language. It targets applications requiring real-time physics like video games, animation, and robotics. It is designed to be fast, stable, and optionally cross-platform deterministic. 
*/