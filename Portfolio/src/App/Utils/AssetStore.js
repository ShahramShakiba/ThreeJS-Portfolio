import { createStore } from 'zustand/vanilla';

const assetsToLoad = [
  {
    path: '/textures/2k_earth_daymap.jpg',
    id: 'earth',
    type: 'texture',
  },
  {
    path: '/textures/2k_mars.jpg',
    id: 'mars',
    type: 'texture',
  },
  {
    path: '/textures/2k_mercury.jpg',
    id: 'mercury',
    type: 'texture',
  },
  {
    path: '/textures/2k_sun.jpg',
    id: 'sun',
    type: 'texture',
  },
];

const assetStore = createStore(() => ({
  assetsToLoad, // or  assetsToLoad: assetsToLoad
  loadAssets: {},
  addLoadedAsset: (asset) => {
    console.log('addLoadedAsset', asset);
  },
}));
export default assetStore;
