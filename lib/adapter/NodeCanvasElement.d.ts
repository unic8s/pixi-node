import { ICanvasRenderingContext2D, utils } from '@pixi/core';
import type { JpegConfig, NodeCanvasRenderingContext2DSettings, PdfConfig, PngConfig } from 'canvas';
import type { ICanvas, ICanvasRenderingContext2DSettings } from '@pixi/core';
/**
 * A node implementation of a canvas element.
 * Uses node-canvas and gl packages to provide the same
 * functionality as a normal HTMLCanvasElement.
 * @class
 */
export declare class NodeCanvasElement implements ICanvas {
    /** Style of the canvas. */
    style: Record<string, any>;
    private _canvas;
    private _event;
    private _contextType?;
    private _ctx?;
    private _gl?;
    private _glExtensions?;
    constructor(width?: number, height?: number, type?: 'image' | 'pdf' | 'svg');
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    get clientWidth(): number;
    get clientHeight(): number;
    getContext(contextId: '2d', options?: ICanvasRenderingContext2DSettings | NodeCanvasRenderingContext2DSettings): ICanvasRenderingContext2D | null;
    getContext(contextId: 'bitmaprenderer', options?: ImageBitmapRenderingContextSettings | NodeCanvasRenderingContext2DSettings): null;
    getContext(contextId: 'webgl' | 'experimental-webgl', options?: WebGLContextAttributes | NodeCanvasRenderingContext2DSettings): WebGLRenderingContext | null;
    getContext(contextId: 'webgl2' | 'experimental-webgl2', options?: WebGLContextAttributes | NodeCanvasRenderingContext2DSettings): null;
    /**
     * For image canvases, encodes the canvas as a PNG. For PDF canvases,
     * encodes the canvas as a PDF. For SVG canvases, encodes the canvas as an
     * SVG.
     */
    toBuffer(cb: (err: Error | null, result: Buffer) => void): void;
    toBuffer(cb: (err: Error | null, result: Buffer) => void, mimeType: 'image/png', config?: PngConfig): void;
    toBuffer(cb: (err: Error | null, result: Buffer) => void, mimeType: 'image/jpeg', config?: JpegConfig): void;
    /**
     * For image canvases, encodes the canvas as a PNG. For PDF canvases,
     * encodes the canvas as a PDF. For SVG canvases, encodes the canvas as an
     * SVG.
     */
    toBuffer(): Buffer;
    toBuffer(mimeType: 'image/png', config?: PngConfig): Buffer;
    toBuffer(mimeType: 'image/jpeg', config?: JpegConfig): Buffer;
    toBuffer(mimeType: 'application/pdf', config?: PdfConfig): Buffer;
    /**
     * Returns the unencoded pixel data, top-to-bottom. On little-endian (most)
     * systems, the array will be ordered BGRA; on big-endian systems, it will
     * be ARGB.
     */
    toBuffer(mimeType: 'raw'): Buffer;
    /** Defaults to PNG image. */
    toDataURL(): string;
    toDataURL(mimeType: 'image/png'): string;
    toDataURL(mimeType: 'image/jpeg', quality?: number): string;
    /** _Non-standard._ Defaults to PNG image. */
    toDataURL(cb: (err: Error | null, result: string) => void): void;
    /** _Non-standard._ */
    toDataURL(mimeType: 'image/png', cb: (err: Error | null, result: string) => void): void;
    /** _Non-standard._ */
    toDataURL(mimeType: 'image/jpeg', cb: (err: Error | null, result: string) => void): void;
    /** _Non-standard._ */
    toDataURL(mimeType: 'image/jpeg', config: JpegConfig, cb: (err: Error | null, result: string) => void): void;
    /** _Non-standard._ */
    toDataURL(mimeType: 'image/jpeg', quality: number, cb: (err: Error | null, result: string) => void): void;
    /**
     * Adds the listener for the specified event.
     * @param type - The type of event to listen for.
     * @param listener - The callback to invoke when the event is fired.
     */
    addEventListener(type: string, listener: EventListenerOrEventListenerObject): utils.EventEmitter<string | symbol, any>;
    /**
     * Removes the listener for the specified event.
     * @param type - The type of event to listen for.
     * @param listener - The callback to invoke when the event is fired.
     */
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject): utils.EventEmitter<string | symbol, any>;
    /**
     * Dispatches the specified event.
     * @param event - The event to emit.
     * @param event.type - The type of event.
     */
    dispatchEvent(event: {
        type: string;
        [key: string]: any;
    }): boolean;
    /** Read canvas pixels as Uint8Array. */
    private _getPixels;
    /** Copy pixels from GL context to 2D context. */
    private _updateContext;
    /**
     * Patch the 2D context.
     * @param ctx - The 2D context.
     */
    private _patch2DContext;
    /**
     * Patch the GL context.
     * @param gl - The GL context.
     */
    private _patchGLContext;
}
