import {TileSet} from './TileSet';
import {TileLayer} from './TileLayer';
import {ImageLayer} from './ImageLayer';
import {AbstractLayer} from "./AbstractLayer";
import * as path from "path";

export class TileMap extends PIXI.Container {

	// TMX properties
	private readonly _version: string;
	private readonly _orientation: string;
	private readonly _height: number;
	private readonly _width: number;
	private readonly _tileHeight: number;
	private readonly _tileWidth: number;
	private readonly _backgroundColor: any;
	private _tileSets: Array<TileSet>;
	private _layers: Array<AbstractLayer>;

	constructor(resource) {
		super();
		const url = resource.url;
		const map = resource.data;

		const bg = new PIXI.Graphics();
		bg.beginFill(this.backgroundColor, 0);
		bg.drawRect(0, 0, map.width * map.tileWidth, map.height * map.tileHeight);
		bg.endFill();
		this.addChild(bg);

		debugger;
		// Parse tilesets
		this._tileSets = [];
		map.tileSets.forEach(data => {
			this.tileSets.push(new TileSet(url, data));
		});

		// Parse layers
		this._layers = [];
		map.layers.forEach(layerData => {
			switch (layerData.type) {
				case 'tile': {
					let tileLayer = new TileLayer(layerData, this.tileSets);
					this.layers[layerData.name] = tileLayer;
					this.addChild(tileLayer);
					break;
				}
				case 'image': {
					let imageLayer = new ImageLayer(layerData, url);
					this.layers[layerData.name] = imageLayer;
					this.addChild(imageLayer);
					break;
				}
				default: {
					this.layers[layerData.name] = layerData;
				}
			}
		});
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

	get tileSets(): Array<TileSet> {
		return this._tileSets;
	}

	get layers(): Array<AbstractLayer> {
		return this._layers;
	}

}
