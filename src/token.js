import * as PIXI from 'pixi.js';
import { TokenLayer } from './layers';

export class Token extends PIXI.Sprite {
	o_height = 0;
	o_width = 0;

	constructor(textureUrl) {
		super(PIXI.Texture.fromImage(textureUrl));
		this.parentGroup = TokenLayer;

		this.o_height = this.height;
		this.o_width = this.width;

		this.interactive = true;
		this.buttonMode = true;
		this
			.on('pointerdown', this.onDragStart)
			.on('pointerup', this.onDragEnd)
			.on('pointerupoutside',this.onDragEnd)
			.on('pointermove', this.onDragMove);

	}

	addToCell(cell) {
		this.height = cell.c_size;
		this.width = cell.c_size;
	}

	removeFromCell(cell) {
		this.height = this.o_height;
		this.width = this.o_width;
	}

	onDragStart(e) {
		// store a reference to the data
		// the reason for this is because of multitouch
		// we want to track the movement of this particular touch
		this.data = e.data;
		this.alpha = 0.5;
		this.dragging = true;
	}

	onDragEnd(e) {
		this.alpha = 1;
		this.dragging = false;
		// set the interaction data to null
		this.data = null;
	}

	onDragMove(e) {
		if (this.dragging) {
			console.log(e);
			const newPosition = this.data.getLocalPosition(this.parent);
			this.x = newPosition.x;
			this.y = newPosition.y;
		}
	}
}
