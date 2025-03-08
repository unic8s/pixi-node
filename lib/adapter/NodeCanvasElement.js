'use strict';

var canvasModule = require('canvas');
var createGLContext = require('gl');
var core = require('@pixi/core');

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const { Canvas, Image, createImageData } = canvasModule;
class NodeCanvasElement {
  constructor(width = 1, height = 1, type) {
    /** Style of the canvas. */
    __publicField(this, "style");
    __publicField(this, "_canvas");
    __publicField(this, "_event");
    __publicField(this, "_contextType");
    __publicField(this, "_ctx");
    __publicField(this, "_gl");
    __publicField(this, "_glExtensions");
    this._canvas = new Canvas(width, height, type);
    this._event = new core.utils.EventEmitter();
    this.style = {};
  }
  get width() {
    return this._canvas.width;
  }
  set width(value) {
    this._glExtensions?.resizeDrawingBuffer?.resize(value, this.height);
    this._canvas.width = value;
  }
  get height() {
    return this._canvas.height;
  }
  set height(value) {
    this._glExtensions?.resizeDrawingBuffer?.resize(this.width, value);
    this._canvas.height = value;
  }
  get clientWidth() {
    return this._canvas.width;
  }
  get clientHeight() {
    return this._canvas.height;
  }
  getContext(type, options) {
    switch (type) {
      case "2d": {
        if (this._contextType && this._contextType !== "2d") return null;
        if (this._ctx) return this._ctx;
        const ctx = this._canvas.getContext("2d", options);
        this._patch2DContext(ctx);
        this._ctx = ctx;
        this._contextType = "2d";
        return ctx;
      }
      case "webgl":
      case "experimental-webgl": {
        if (this._contextType && this._contextType !== "webgl") return null;
        if (this._gl) return this._gl;
        const { width, height } = this;
        const ctx = this._canvas.getContext("2d", options);
        const gl = createGLContext(width, height, options);
        this._patchGLContext(gl);
        this._ctx = ctx;
        this._gl = gl;
        this._glExtensions = {
          resizeDrawingBuffer: gl.getExtension("STACKGL_resize_drawingbuffer")
        };
        this._contextType = "webgl";
        return gl;
      }
      default:
        return null;
    }
  }
  /**
   * Returns a buffer of the canvas contents.
   * @param args - the arguments to pass to the toBuffer method
   */
  toBuffer(...args) {
    this._updateContext();
    return this._canvas.toBuffer(...args);
  }
  /**
   * Returns a base64 encoded string representation of the canvas.
   * @param args - The arguments to pass to the toDataURL method.
   */
  toDataURL(...args) {
    this._updateContext();
    return this._canvas.toDataURL(...args);
  }
  /**
   * Adds the listener for the specified event.
   * @param type - The type of event to listen for.
   * @param listener - The callback to invoke when the event is fired.
   */
  addEventListener(type, listener) {
    return this._event.addListener(type, listener);
  }
  /**
   * Removes the listener for the specified event.
   * @param type - The type of event to listen for.
   * @param listener - The callback to invoke when the event is fired.
   */
  removeEventListener(type, listener) {
    if (listener) {
      return this._event.removeListener(type, listener);
    }
    return this._event.removeAllListeners(type);
  }
  /**
   * Dispatches the specified event.
   * @param event - The event to emit.
   * @param event.type - The type of event.
   */
  dispatchEvent(event) {
    event.target = this;
    return this._event.emit(event.type, event);
  }
  /** Read canvas pixels as Uint8Array. */
  _getPixels() {
    switch (this._contextType) {
      case "2d": {
        const { width, height, _ctx: ctx } = this;
        const imageData = ctx?.getImageData(0, 0, width, height);
        if (imageData) {
          const { buffer, byteOffset, length } = imageData.data;
          return new Uint8Array(buffer, byteOffset, length);
        }
        return new Uint8Array(0);
      }
      case "webgl": {
        const { width, height, _gl: gl } = this;
        const lineByteCount = 4 * width;
        const pixels = new Uint8Array(height * lineByteCount);
        gl?.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        const tmp = new Uint8Array(lineByteCount);
        for (let srcRow = 0; srcRow < height >> 1; srcRow++) {
          const dstRow = height - srcRow - 1;
          const srcIndex = srcRow * lineByteCount;
          const dstIndex = dstRow * lineByteCount;
          const src = pixels.subarray(srcIndex, srcIndex + lineByteCount);
          const dst = pixels.subarray(dstIndex, dstIndex + lineByteCount);
          tmp.set(dst);
          dst.set(src);
          src.set(tmp);
        }
        return pixels;
      }
      default: {
        throw new Error("getContext() has not been called");
      }
    }
  }
  /** Copy pixels from GL context to 2D context. */
  _updateContext() {
    if (this._contextType === "webgl") {
      const { width, height, _ctx: ctx } = this;
      const pixels = this._getPixels();
      const imageData = createImageData(new Uint8ClampedArray(pixels.buffer), width, height);
      ctx?.putImageData(imageData, 0, 0);
    }
  }
  /**
   * Patch the 2D context.
   * @param ctx - The 2D context.
   */
  _patch2DContext(ctx) {
    const _drawImage = ctx.drawImage;
    ctx.drawImage = function drawImage(image, ...args) {
      if (image instanceof NodeCanvasElement) {
        image._updateContext();
        image = image._canvas;
      }
      return _drawImage.call(this, image, ...args);
    };
    const _createPattern = ctx.createPattern;
    ctx.createPattern = function createPattern(image, ...args) {
      if (image instanceof NodeCanvasElement) {
        image._updateContext();
        image = image._canvas;
      }
      return _createPattern.call(this, image, ...args);
    };
  }
  /**
   * Patch the GL context.
   * @param gl - The GL context.
   */
  _patchGLContext(gl) {
    const _getUniformLocation = gl.getUniformLocation;
    gl.getUniformLocation = function getUniformLocation(program, name) {
      if (program._uniforms && !/\[\d+\]$/.test(name)) {
        const reg = new RegExp(`${name}\\[\\d+\\]$`);
        for (let i = 0; i < program._uniforms.length; i++) {
          const _name = program._uniforms[i].name;
          if (reg.test(_name)) {
            name = _name;
          }
        }
      }
      return _getUniformLocation.call(this, program, name);
    };
    function convertTexImageSource(source) {
      if (source instanceof NodeCanvasElement) {
        source._updateContext();
        return source;
      }
      if (source instanceof Image) {
        const { width, height } = source;
        const canvas = new Canvas(width, height);
        canvas.getContext("2d").drawImage(source, 0, 0);
        return source;
      }
      return source;
    }
    const _texImage2D = gl.texImage2D;
    gl.texImage2D = function texImage2D(...args) {
      args[args.length - 1] = convertTexImageSource(args[args.length - 1]);
      return _texImage2D.apply(this, args);
    };
    const _texSubImage2D = gl.texSubImage2D;
    gl.texSubImage2D = function texSubImage2D(...args) {
      args[args.length - 1] = convertTexImageSource(args[args.length - 1]);
      return _texSubImage2D.apply(this, args);
    };
  }
}

exports.NodeCanvasElement = NodeCanvasElement;
//# sourceMappingURL=NodeCanvasElement.js.map
