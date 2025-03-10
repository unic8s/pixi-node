import canvasModule from 'canvas';
import { getFontFamilyName } from '@pixi/assets';
import { ExtensionType, utils, extensions } from '@pixi/core';

const { registerFont } = canvasModule;
const validWeights = [
  "normal",
  "bold",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900"
];
const validFonts = [".woff", ".woff2", ".ttf", ".otf"];
const loadNodeFont = {
  extension: ExtensionType.LoadParser,
  name: "loadFont",
  test(url) {
    return validFonts.includes(utils.path.extname(url).toLowerCase());
  },
  async load(url, options) {
    const name = options.data?.family ?? getFontFamilyName(url);
    const weights = options.data?.weights?.filter((weight) => validWeights.includes(weight)) ?? ["normal"];
    const data = options.data ?? {};
    for (let i = 0; i < weights.length; i++) {
      const weight = weights[i];
      registerFont(url, {
        ...data,
        family: options.data?.family ?? name,
        weight
      });
    }
  }
};
extensions.add(loadNodeFont);

export { loadNodeFont };
//# sourceMappingURL=loadNodeFont.mjs.map
