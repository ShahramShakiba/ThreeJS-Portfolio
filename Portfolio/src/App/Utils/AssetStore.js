import { createStore } from 'zustand/vanilla';
import avatar from '../../../static/models/avatar.glb';
import environment from '../../../static/models/environment.glb';

const assetsToLoad = [
  {
    id: 'avatar',
    path: avatar,
    type: 'model',
  },
  {
    id: 'environment',
    path: environment,
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
