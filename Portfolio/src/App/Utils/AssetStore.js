import { createStore } from 'zustand/vanilla';

const assetsToLoad = [
  {
    id: 'avatar',
    path: '/models/avatar.glb',
    type: 'model',
  },
  {
    id: 'environment',
    path: '/models/environment.glb',
    type: 'model',
  },
];

const assetStore = createStore((set) => ({
  assetsToLoad, // or  assetsToLoad: assetsToLoad
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

/* createStore((set) => ({}))
- we have this "set" function that we get from our createStore-fn
- which helps us to set a new "state"
- within the callback-fn of "set" we can access to a variable that holds information about the "previous state" in your application 
*/
