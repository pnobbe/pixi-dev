import * as PIXI from "pixi.js";

export default class Debug extends PIXI.Container {

	private readonly background: PIXI.Sprite;
	private readonly app: PIXI.Application;

	constructor(app) {
		super();
		this.app = app;

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
