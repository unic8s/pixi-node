import { Resource } from '@pixi/core';
import { NodeCanvasElement } from './NodeCanvasElement';
import type { BaseTexture, GLTexture, Renderer } from '@pixi/core';
/**
 * A canvas resource using node-canvas
 * used for images, svg, and bitmap text
 */
export declare class NodeCanvasResource extends Resource {
    /**
     * The source element.
     * @member {NodeCanvasElement}
     * @readonly
     */
    source: NodeCanvasElement | null;
    /**
     * If set to `true`, will force `texImage2D` over `texSubImage2D` for uploading.
     * Certain types of media (e.g. video) using `texImage2D` is more performant.
     * @default false
     * @private
     */
    noSubImage: boolean;
    constructor(source: NodeCanvasElement);
    upload(renderer: Renderer, baseTexture: BaseTexture, glTexture: GLTexture, source?: HTMLCanvasElement): boolean;
    /**
     * Checks if source width/height was changed, resize can cause extra baseTexture update.
     * Triggers one update in any case.
     */
    update(): void;
    dispose(): void;
    static test(source: unknown): source is NodeCanvasElement;
    /**
     * Set cross origin based detecting the url and the crossorigin
     * @param element - Element to apply crossOrigin
     * @param url - URL to check
     * @param crossorigin - Cross origin value to use
     */
    static crossOrigin(element: HTMLImageElement | HTMLVideoElement, url: string, crossorigin?: boolean | string): void;
}
