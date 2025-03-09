'use strict';

var canvasModule = require('canvas');
var core = require('@pixi/core');
var NodeCanvasElement = require('./NodeCanvasElement.js');

const { loadImage } = canvasModule;
const validMimes = ["image/png", "image/jpg", "image/jpeg", "image/svg"];
function isSupportedDataURL(url) {
  const match = url.match(/^data:([^;]+);base64,/);
  if (!match) return false;
  const mimeType = match[1];
  return validMimes.includes(mimeType);
}
const loadNodeBase64 = {
  extension: core.ExtensionType.LoadParser,
  name: "loadBase64",
  test(url) {
    return isSupportedDataURL(url);
  },
  async load(url, asset) {
    const image = await loadImage(url);
    const canvas = new NodeCanvasElement.NodeCanvasElement(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(image, 0, 0);
    const texture = core.Texture.from(canvas, {
      resolution: core.utils.getResolutionOfUrl(url),
      ...asset.data
    });
    return texture;
  },
  unload(texture) {
    texture.destroy(true);
  }
};
core.extensions.add(loadNodeBase64);

exports.loadNodeBase64 = loadNodeBase64;
//# sourceMappingURL=loadNodeBase64.js.map
