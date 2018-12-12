import * as PIXI from 'pixi.js';
import { Cell } from './cell';
import { GridLayer } from './layers';

export class Grid extends PIXI.Container {

	constructor(cell_size) {
		super();

		this.parentGroup = GridLayer;

		const c_size = cell_size || 32;
		this.map = [];

		for (let i = 0; i < 20; i++) {
			this.map[i] = [];
			for (let j = 0; j < 20; j++) {
				const cell = new Cell(c_size, i, j);
				this.map[i][j] = cell;
				this.addChild(cell);
			}
		}
	}
}
