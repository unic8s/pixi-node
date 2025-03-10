import canvasModule from 'canvas';
import { ExtensionType, Texture, utils, extensions } from '@pixi/core';
import { NodeCanvasElement } from './NodeCanvasElement.mjs';

const { loadImage } = canvasModule;
const validMimes = ["image/png", "image/jpg", "image/jpeg", "image/svg"];
function isSupportedDataURL(url) {
  const match = url.match(/^data:([^;]+);base64,/);
  if (!match) return false;
  const mimeType = match[1];
  return validMimes.includes(mimeType);
}
const loadNodeBase64 = {
  extension: ExtensionType.LoadParser,
  name: "loadBase64",
  test(url) {
    return isSupportedDataURL(url);
  },
  async load(url, asset) {
    const image = await loadImage(url);
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
extensions.add(loadNodeBase64);

export { loadNodeBase64 };
//# sourceMappingURL=loadNodeBase64.mjs.map
