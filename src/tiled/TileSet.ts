import {Image} from "./Image";

export class TileSet {

	private readonly _textures: Array<PIXI.Texture>;
	private readonly _baseTexture: PIXI.BaseTexture;
	private readonly _data: any;

	private readonly _firstGid: number;
	private readonly _source: string;
	private readonly _name: string;
	private readonly _tileWidth: number;
	private readonly _tileHeight: number;
	private readonly _spacing: number;
	private readonly _margin: number;
	private readonly _tileOffset: { x: number, y: number};
	private readonly _properties: any;
	private readonly _image: Image;
	private readonly _tiles: Array<any>;
	private readonly _terrainTypes: Array<any>;


	constructor(url, dataa) {
		this._data = dataa;
		this._baseTexture = PIXI.BaseTexture.fromImage(url + '/' + this.image.source, false, PIXI.SCALE_MODES.NEAREST);
		this._textures = [];

		for (let y = this.margin; y < this.image.height; y += this.tileHeight + this.spacing) {
			for (let x = this.margin; x < this.image.width; x += this.tileWidth + this.spacing) {
				this._textures.push(new PIXI.Texture(this._baseTexture, new PIXI.Rectangle(x, y, this.tileWidth, this.tileHeight)));
			}
		}
	}

	getTextureById(id: number): PIXI.Texture {
		return this.textures[id];
	}

	getTextureByGid(gid: number): PIXI.Texture {
		return this.textures[gid - this.firstGid];
	}

	get textures(): Array<PIXI.Texture> {
		return this._textures;
	}

	get image(): any {
		return this._data.image;
	}

	get margin(): number {
		return this._data.margin;
	}

	get spacing(): number {
		return this._data.spacing;
	}

	get tileWidth(): number {
		return this._data.tileWidth;
	}

	get tileHeight(): number {
		return this._data.tileHeight;
	}

	get firstGid(): number {
		return this._data.firstGid;
	}

}
