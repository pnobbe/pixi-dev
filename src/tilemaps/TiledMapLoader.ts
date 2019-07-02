
export class TiledMapLoader extends PIXI.loaders.Loader {
	private static _instance: PIXI.loaders.Loader;

	constructor() {
		super();
	}

	_onLoad() {

	}

	_onComplete() {

	}

	_onStart() {

	}

	static getInstance(): PIXI.loaders.Loader {
		if (!this._instance) {
			this._instance = new PIXI.loaders.Loader();
		}
		return this._instance;
	}
}
