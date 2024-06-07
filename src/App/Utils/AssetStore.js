import { createStore } from 'zustand/vanilla';

const avatarPath = '../../../models/avatar.glb';
const environmentPath = '../../../models/environment.glb';
const assetsToLoad = [
  {
    id: 'avatar',
    path: avatarPath,
    type: 'model',
  },
  {
    id: 'environment',
    path: environmentPath,
    type: 'model',
  },
];

const assetStore = createStore((set) => ({
  assetsToLoad,
  loadedAssets: {},
  addLoadedAsset: (asset, id) =>
    set((state) => ({
      loadedAssets: {
        ...state.loadedAssets,
        [id]: asset,
      },
    })),
}));
export default assetStore;
