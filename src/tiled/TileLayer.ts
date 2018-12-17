import {Tile} from './Tile';
import {AbstractLayer} from "./AbstractLayer";
import {TileMap} from "./TileMap";
import {TileSet} from "./TileSet";

export class TileLayer extends AbstractLayer {

    private readonly _map: TileMap;
    private readonly _tiles: Array<Tile>;
    private readonly _tileCount;
    private readonly _horizontalFlips: Array<boolean>;
    private readonly _verticalFlips: Array<boolean>;
    private readonly _diagonalFlips: Array<boolean>;
    private readonly _tileSets: Array<TileSet>;

    constructor(props, tileSets) {
        super(props);
        this._map = props.map;
        this._tileCount = this._map.height * this._map.width;

        this._tiles = new Array(this.tileCount);
        this._horizontalFlips = new Array(this.tileCount);
        this._verticalFlips = new Array(this.tileCount);
        this._diagonalFlips = new Array(this.tileCount);

        this._tileSets = tileSets;
        this.create(props);
    }

    create(props: any) {
        for (let y = 0; y < this.map.height; y++) {
            for (let x = 0; x < this.map.width; x++) {
                let i = x + (y * this.map.width);

                if (props.tiles[i]) {

                    if (props.tiles[i].id && props.tiles[i].id !== 0) {

                        let tileset = TileLayer.findTileset(props.tiles[i].id, this._tileSets);
                        let tile = new Tile(props.tiles[i], tileset, this.horizontalFlips[i], this.verticalFlips[i], this.diagonalFlips[i]);

                        tile.x = x * this.map.tileWidth;
                        tile.y = y * this.map.tileHeight;

                        if (tileset.tileOffset) {
                            tile.x += tileset.tileOffset.x;
                            tile.y += tileset.tileOffset.y;
                        }

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
            if (tileset.firstGid <= gid) {
                break;
            }
        }
        return tileset;
    }

    get tileCount(): number {
        return this._tileCount;
    }

    get map(): TileMap {
        return this._map;
    }

    get tiles(): Array<Tile> {
        return this._tiles;
    }

    get horizontalFlips(): Array<boolean> {
        return this._horizontalFlips;
    }

    get verticalFlips(): Array<boolean> {
        return this._verticalFlips;
    }

    get diagonalFlips(): Array<boolean> {
        return this._diagonalFlips;
    }
}
