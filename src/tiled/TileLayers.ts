import {AbstractLayer} from "./AbstractLayer";

export class TileLayers extends PIXI.Container {
	private readonly _layers: Array<AbstractLayer>;
	constructor() {
		super();
		this._layers = [];
	}

	addLayer(layer: AbstractLayer) {
		this._layers[layer.name] = layer;
		this.addChild(layer);
	}

	removeLayer(layer: AbstractLayer) {
		this._layers[layer.name] = null;
		this.removeChild(layer);
	}
}
