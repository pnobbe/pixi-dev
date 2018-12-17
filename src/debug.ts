import * as PIXI from "pixi.js";
import {StatsJSAdapter} from "./gstats/StatJSAdapter";
import {PIXIHooks} from "./gstats/PIXIHooks";

export default class Debug extends PIXI.Container {

	private readonly background: PIXI.Sprite;
	private readonly app: PIXI.Application;

	constructor(app) {
		super();
		this.app = app;
		const pixiHooks = new PIXIHooks(this.app);
		const gstat = new StatsJSAdapter(pixiHooks);

		document.body.appendChild(gstat._stats.dom || gstat._stats.domElement);
		app.ticker.add(gstat.update);

		this.background = new PIXI.Sprite(PIXI.Texture.WHITE);
		this.background.alpha = 0.8;

		this.addChild(this.background);

		this.create();
	}

	create() {
		const style = {fontSize: 16, fontFamily: 'SegoeUI'};
		let text = new PIXI.Text(`Debug`, style);
		this.addText(text);

	}

	resize() {
		this.background.width = 250;
		this.background.height = this.getBounds().height + 5;
	}

	addText(text) {
		text.x = 5;
		text.y = this.getBounds().height;
		this.addChild(text);
		this.resize();
	}
}
