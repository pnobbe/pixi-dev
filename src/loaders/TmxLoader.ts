import {TileMapMiddleware} from "../tiled/TileMapMiddleware";
import {Loader} from 'pixi.js';

export class TmxLoader extends Loader {
    constructor() {
        super();
        this.use(TileMapMiddleware());
    }
}
