import { createStore } from 'zustand/vanilla';
import assetStore from './AssetStore';

export const sizesStore = createStore(() => ({
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
}));

export const appStateStore = createStore(() => ({
  physicsReady: false,
  assetReady: false,
}));

export const inputStore = createStore(() => ({
  forward: false,
  backward: false,
  left: false,
  right: false,
}));
