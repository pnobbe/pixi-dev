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

	private readonly resourceUrl: string;


	constructor(resourceUrl) {
		super();

		const url = path.dirname(PIXI.loader.resources[resourceUrl].url);
		const mapData = PIXI.loader.resources[this.resourceUrl].data;

		const bg = new PIXI.Graphics();
		bg.beginFill(this._backgroundColor, 0);
		bg.drawRect(0, 0, mapData._width * mapData.tileWidth, mapData._height * mapData.tileHeight);
		bg.endFill();
		this.addChild(bg);

		// Parse tilesets
		this._tileSets = [];
		mapData.tileSets.forEach(data => {
			this._tileSets.push(new TileSet(url, data));
		});

		// Parse layers
		this._layers = [];
		mapData.layers.forEach(layerData => {
			switch (layerData.type) {
				case 'tile': {
					let tileLayer = new TileLayer(layerData, this._tileSets);
					this._layers[layerData.name] = tileLayer;
					this.addChild(tileLayer);
					break;
				}
				case 'image': {
					let imageLayer = new ImageLayer(layerData, url);
					this._layers[layerData.name] = imageLayer;
					this.addChild(imageLayer);
					break;
				}
				default: {
					this._layers[layerData.name] = layerData;
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

}
