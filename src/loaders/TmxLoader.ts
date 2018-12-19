import {TileMapMiddleware} from "../tiled/TileMapMiddleware";

export class TmxLoader extends PIXI.loaders.Loader {
	constructor() {
		super();
		this.use(TileMapMiddleware());
	}
}
