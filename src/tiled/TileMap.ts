import {TileLayer} from './layers/TileLayer';
import {ImageLayer} from './layers/ImageLayer';
import {AbstractLayer} from "./layers/AbstractLayer";

export class TileMap extends PIXI.Container {

    // TMX properties
    private readonly _version: string;
    private readonly _orientation: string;
    private readonly _height: number;
    private readonly _width: number;
    private readonly _tileHeight: number;
    private readonly _tileWidth: number;
    private readonly _backgroundColor: any;
    private _tileSets: Array<PIXI.Spritesheet>;

    constructor(resource) {
        super();
        const map = resource.data;
        const bg = new PIXI.Graphics();

        this._tileHeight = map.tileHeight;
        this._tileWidth = map.tileWidth;
        this._width = map.width;
        this._height = map.height;

        bg.beginFill(this.backgroundColor, 0);
        bg.drawRect(0, 0, map.width * map.tileWidth, map.height * map.tileHeight);
        bg.endFill();
        this.addChild(bg);

        // Parse layers
        map.layers.map(layer => {
                try {
                    this.addChild(this.parseLayer(layer))
                } catch (e) {
                    // Something went wrong with layer parsing
                    //throw new Error(e);
                }
            }
        );

    }

    parseLayer(layer: TileLayer): AbstractLayer {
        switch (layer.type) {
            case 'tile': {
                return new TileLayer(layer);
            }
            case 'image': {
                return new ImageLayer(layer);
            }
            case 'object': {
                //return layer;
                throw null;
            }
            default: {
                throw new Error(`Error parsing layer, invalid layer type: '${layer.type}'.`);
            }
        }
    }

    get version(): string {
        return this._version;
    }

    get orientation(): string {
        return this._orientation;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get tileWidth(): number {
        return this._tileWidth;
    }

    get tileHeight(): number {
        return this._tileHeight;
    }

    get backgroundColor(): number {
        return this._backgroundColor;
    }

    get tileSets(): Array<PIXI.Spritesheet> {
        return this._tileSets;
    }

}
