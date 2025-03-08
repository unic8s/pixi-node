'use strict';

var core = require('@pixi/core');
var NodeCanvasElement = require('./NodeCanvasElement.js');

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class NodeCanvasResource extends core.Resource {
  constructor(source) {
    const sourceAny = source;
    const width = sourceAny.naturalWidth || sourceAny.videoWidth || sourceAny.width;
    const height = sourceAny.naturalHeight || sourceAny.videoHeight || sourceAny.height;
    super(width, height);
    /**
     * The source element.
     * @member {NodeCanvasElement}
     * @readonly
     */
    __publicField(this, "source");
    /**
     * If set to `true`, will force `texImage2D` over `texSubImage2D` for uploading.
     * Certain types of media (e.g. video) using `texImage2D` is more performant.
     * @default false
     * @private
     */
    __publicField(this, "noSubImage");
    this.source = source;
    this.noSubImage = false;
  }
  upload(renderer, baseTexture, glTexture, source) {
    const gl = renderer.gl;
    const width = baseTexture.realWidth;
    const height = baseTexture.realHeight;
    source = source || this.source;
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === core.ALPHA_MODES.UNPACK);
    if (!this.noSubImage && baseTexture.target === gl.TEXTURE_2D && glTexture.width === width && glTexture.height === height) {
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, baseTexture.format, glTexture.type, source);
    } else {
      glTexture.width = width;
      glTexture.height = height;
      gl.texImage2D(
        baseTexture.target,
        0,
        glTexture.internalFormat,
        baseTexture.format,
        glTexture.type,
        source
      );
    }
    return true;
  }
  /**
   * Checks if source width/height was changed, resize can cause extra baseTexture update.
   * Triggers one update in any case.
   */
  update() {
    if (this.destroyed) {
      return;
    }
    const source = this.source;
    const width = source.naturalWidth || source.videoWidth || source.width;
    const height = source.naturalHeight || source.videoHeight || source.height;
    this.resize(width, height);
    super.update();
  }
  dispose() {
    this.source = null;
  }
  static test(source) {
    return source instanceof NodeCanvasElement.NodeCanvasElement;
  }
  /**
   * Set cross origin based detecting the url and the crossorigin
   * @param element - Element to apply crossOrigin
   * @param url - URL to check
   * @param crossorigin - Cross origin value to use
   */
  static crossOrigin(element, url, crossorigin) {
    if (crossorigin === void 0 && !url.startsWith("data:")) {
      element.crossOrigin = core.utils.determineCrossOrigin(url);
    } else if (crossorigin !== false) {
      element.crossOrigin = typeof crossorigin === "string" ? crossorigin : "anonymous";
    }
  }
}

exports.NodeCanvasResource = NodeCanvasResource;
//# sourceMappingURL=NodeCanvasResource.js.map
