import {Tile} from './Tile';
import {AbstractLayer} from "./AbstractLayer";
import {TileMap} from "./TileMap";

export class TileLayer extends AbstractLayer {

    private readonly _tiles: Array<Tile>;
    private readonly _tileCount;

    constructor(props) {
        super(props);
        this._tileCount = props.map.height * props.map.width;
        this._tiles = new Array(this.tileCount);

        this.create(props);
    }

    create(props: any) {
        for (let y = 0; y < props.map.height; y++) {
            for (let x = 0; x < props.map.width; x++) {
                let i = x + (y * props.map.width);

                if (props.tiles[i]) {
					const tileData = props.tiles[i];
					if (tileData.id) {
                        const textures = [];
						const spritesheet = TileLayer.findTileset(tileData.gid, props.map.tileSets);
						let duration = 0;
						if (tileData.animations.length) {
						    duration = tileData.animations[0].duration;
							tileData.animations.forEach(anim => {
                                textures.push(spritesheet.textures[anim.tileId]);
							});
                        } else {
                            textures.push(spritesheet.textures[tileData.id]);
                        }
                        let tile = new Tile(textures, duration, props.horizontalFlips[i], props.verticalFlips[i], props.diagonalFlips[i]);
                        tile.x = x * props.map.tileWidth;
                        tile.y = y * props.map.tileHeight;

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

	static findTileset(gid, tileSets) {
		let tileset;
		for (let i = tileSets.length - 1; i >= 0; i--) {
			tileset = tileSets[i];
			if (tileset.data.meta.name <= gid) {
				break;
			}
		}
		return tileset;
	}

    get tileCount(): number {
        return this._tileCount;
    }

    get tiles(): Array<Tile> {
        return this._tiles;
    }

}
