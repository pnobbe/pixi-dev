import {Tile} from '../Tile';
import {AbstractLayer} from "./AbstractLayer";

export class TileLayer extends AbstractLayer {
	constructor(props) {
		super(props);
		this._tileCount = props.map.height * props.map.width;
		this._tiles = new Array(this.tileCount);

		this.initialize(props);
	}

	private readonly _tiles: Array<Tile>;
	private readonly _tileCount;
	private textures: Array<PIXI.Texture>;

	initialize(props) {
		const { map, tiles, horizontalFlips, verticalFlips, diagonalFlips} = props;
		for (let y = 0; y < map.height; y++) {
			for (let x = 0; x < map.width; x++) {
				let i = x + (y * map.width);

				if (tiles[i]) {
					const tileData = tiles[i];
					if (tileData.id) {
						const textures = [];
						const durations = [];
						const spritesheet = TileLayer.findSpritesheet(tileData.gid, map.spritesheets);
						if (tileData.animations.length) {
							tileData.animations.forEach(anim => {
								textures.push(spritesheet.textures[anim.tileId]);
								durations.push(anim.duration);
							});
						} else {
							textures.push(spritesheet.textures[tileData.id]);
						}
						let tile = new Tile(textures, durations, horizontalFlips[i], verticalFlips[i] ,diagonalFlips[i]);
						tile.x = x * map.tileWidth;
						tile.y = y * map.tileHeight;

						// if (tileset.tileOffset) {
						//     tile.x += tileset.tileOffset.x;
						//     tile.y += tileset.tileOffset.y;
						// }

						this.tiles.push(tile);
						this.addChild(tile);
					}
				}
			}
		}
	}

	static findSpritesheet(gid, tileSets): PIXI.Spritesheet {
		if (!(Object.keys(tileSets).length > 1)) { return tileSets[Object.keys(tileSets)[0]] }

		let last;
		Object.keys(tileSets).forEach(tileset => {
			if (tileset > gid) {
				return last;
			}
			last = tileSets[tileset];
		});
		return null;
	}

	get tileCount(): number {
		return this._tileCount;
	}

	get tiles(): Array<Tile> {
		return this._tiles;
	}

}
