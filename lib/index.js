'use strict';

var app = require('@pixi/app');
var assets = require('@pixi/assets');
var core = require('@pixi/core');
require('@pixi/mixin-cache-as-bitmap');
require('@pixi/mixin-get-child-by-name');
require('@pixi/mixin-get-global-position');
require('./adapter/polyfills.js');
var adapter = require('./adapter/adapter.js');
var loadNodeBase64 = require('./adapter/loadNodeBase64.js');
var loadNodeFont = require('./adapter/loadNodeFont.js');
var loadNodeTexture = require('./adapter/loadNodeTexture.js');
var NodeCanvasElement = require('./adapter/NodeCanvasElement.js');
var NodeCanvasResource = require('./adapter/NodeCanvasResource.js');
var filters = require('./filters.js');
var display = require('@pixi/display');
var extract = require('@pixi/extract');
var filterAlpha = require('@pixi/filter-alpha');
var filterBlur = require('@pixi/filter-blur');
var filterColorMatrix = require('@pixi/filter-color-matrix');
var filterDisplacement = require('@pixi/filter-displacement');
var filterFxaa = require('@pixi/filter-fxaa');
var filterNoise = require('@pixi/filter-noise');
var graphics = require('@pixi/graphics');
var mesh = require('@pixi/mesh');
var meshExtras = require('@pixi/mesh-extras');
var particleContainer = require('@pixi/particle-container');
var prepare = require('@pixi/prepare');
var sprite = require('@pixi/sprite');
var spriteAnimated = require('@pixi/sprite-animated');
var spriteTiling = require('@pixi/sprite-tiling');
var spritesheet = require('@pixi/spritesheet');
var text = require('@pixi/text');
var textBitmap = require('@pixi/text-bitmap');

core.extensions.remove(
  assets.detectMp4,
  assets.detectOgv,
  assets.detectWebm,
  assets.loadTextures,
  assets.loadWebFont,
  app.ResizePlugin
);
core.INSTALLED.length = 0;
core.INSTALLED.push(NodeCanvasResource.NodeCanvasResource);

Object.defineProperty(exports, 'settings', {
    enumerable: true,
    get: function () { return core.settings; }
});
exports.NodeAdapter = adapter.NodeAdapter;
exports.loadNodeBase64 = loadNodeBase64.loadNodeBase64;
exports.loadNodeFont = loadNodeFont.loadNodeFont;
exports.loadNodeTexture = loadNodeTexture.loadNodeTexture;
exports.NodeCanvasElement = NodeCanvasElement.NodeCanvasElement;
exports.NodeCanvasResource = NodeCanvasResource.NodeCanvasResource;
exports.filters = filters.filters;
Object.keys(app).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return app[k]; }
    });
});
Object.keys(assets).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return assets[k]; }
    });
});
Object.keys(core).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return core[k]; }
    });
});
Object.keys(display).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return display[k]; }
    });
});
Object.keys(extract).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return extract[k]; }
    });
});
Object.keys(filterAlpha).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return filterAlpha[k]; }
    });
});
Object.keys(filterBlur).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return filterBlur[k]; }
    });
});
Object.keys(filterColorMatrix).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return filterColorMatrix[k]; }
    });
});
Object.keys(filterDisplacement).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return filterDisplacement[k]; }
    });
});
Object.keys(filterFxaa).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return filterFxaa[k]; }
    });
});
Object.keys(filterNoise).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return filterNoise[k]; }
    });
});
Object.keys(graphics).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return graphics[k]; }
    });
});
Object.keys(mesh).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return mesh[k]; }
    });
});
Object.keys(meshExtras).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return meshExtras[k]; }
    });
});
Object.keys(particleContainer).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return particleContainer[k]; }
    });
});
Object.keys(prepare).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return prepare[k]; }
    });
});
Object.keys(sprite).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return sprite[k]; }
    });
});
Object.keys(spriteAnimated).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return spriteAnimated[k]; }
    });
});
Object.keys(spriteTiling).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return spriteTiling[k]; }
    });
});
Object.keys(spritesheet).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return spritesheet[k]; }
    });
});
Object.keys(text).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return text[k]; }
    });
});
Object.keys(textBitmap).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return textBitmap[k]; }
    });
});
//# sourceMappingURL=index.js.map
