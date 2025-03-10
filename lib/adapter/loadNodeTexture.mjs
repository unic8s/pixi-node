import canvasModule from 'canvas';
import { ExtensionType, utils, settings, Texture, extensions } from '@pixi/core';
import { NodeCanvasElement } from './NodeCanvasElement.mjs';

const { loadImage } = canvasModule;
const validImages = [".jpg", ".png", ".jpeg", ".svg"];
const loadNodeTexture = {
  extension: ExtensionType.LoadParser,
  name: "loadTextures",
  test(url) {
    return validImages.includes(utils.path.extname(url).toLowerCase());
  },
  async load(url, asset) {
    const data = await settings.ADAPTER.fetch(url);
    const image = await loadImage(Buffer.from(await data.arrayBuffer()));
    const canvas = new NodeCanvasElement(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(image, 0, 0);
    const texture = Texture.from(canvas, {
      resolution: utils.getResolutionOfUrl(url),
      ...asset.data
    });
    return texture;
  },
  unload(texture) {
    texture.destroy(true);
  }
};
extensions.add(loadNodeTexture);

export { loadNodeTexture };
//# sourceMappingURL=loadNodeTexture.mjs.map
