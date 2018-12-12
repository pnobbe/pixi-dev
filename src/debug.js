import * as PIXI from "pixi.js";

export default class Debug extends PIXI.Container {

	background;
	constructor() {
		super();
		this.background = new PIXI.Sprite(PIXI.Texture.WHITE);
		this.background.alpha = 0.8;
		this.addChild(this.background);

		this.create();
	}

	create() {
		const style = { font: '16px SegoeUI' };
		let text = new PIXI.Text(`Debug`, style);
		this.addText(text);
		let fpsText = new PIXI.Text(`FPS:`, style);
		this.addText(fpsText);

		PIXI.ticker.shared.add(() => {
			fpsText.text = `FPS: ${PIXI.ticker.shared.FPS}`;
		});

	}

	resize() {
		this.background.width = 250;
		this.background.height = this.getBounds().height+5;
	}

	addText(text) {
		text.x = 5;
		text.y = this.getBounds().height;
		this.addChild(text);
		this.resize();
	}
}
