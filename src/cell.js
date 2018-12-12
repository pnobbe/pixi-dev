import * as PIXI from 'pixi.js';
import { GridLayer } from './layers';

export class Cell extends PIXI.Container {
	cell = null;

	hIndex = 0;
	vIndex = 0;

	self = this;
	c_size = 0;
	hover = false;

	constructor(cell_size, h_index, v_index) {
		super();
		this.cell = new PIXI.Graphics();
		this.hIndex = h_index;
		this.vIndex = v_index;
		this.c_size = cell_size || 32;
		this.parentGroup = GridLayer;

		this.interactive = true;
		this.hitArea = new PIXI.Rectangle(this.c_size * this.hIndex, this.c_size * this.vIndex, this.c_size, this.c_size);

		this.on('mouseover', this.onMouseOver);
		this.on('mouseout', this.onMouseOut);

		this.drawCell();

	}

	drawCell(highlight) {
		this.cell.clear();
		this.cell.lineStyle(1, 0xd9fff2, 0.2);
		this.cell.beginFill(0xfff748, (highlight ? 1 : 0));

		this.cell.drawRect(this.c_size * this.hIndex, this.c_size * this.vIndex, this.c_size, this.c_size);

		this.addChild(this.cell);
	}



	removeToken(token) {
		this.drawCell();
		this.removeChild(token);
	}

	addToken(token) {
		this.drawCell(true);
		this.addChild(token);
	}
}
