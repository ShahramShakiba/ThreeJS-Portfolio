import assetStore from '../Utils/AssetStore';

export default class Preloader {
  constructor() {
    this.assetStore = assetStore;

    this.assetStore.subscribe((state) => {
      console.log(state.loadedAssets);
      this.numberOfLoadedAssets = Object.keys(state.loadedAssets).length;
      this.numberOfAssetsToLoad = state.assetsToLoad.length;

      this.progress = this.numberOfLoadedAssets / this.numberOfAssetsToLoad;
      console.log(this.progress);
    });
  }
}
