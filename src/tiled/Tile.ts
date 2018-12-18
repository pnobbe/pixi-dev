import {OutlineFilter} from '@pixi/filter-outline';

export class Tile extends PIXI.extras.AnimatedSprite {
	private readonly _hightlightFilter: OutlineFilter;

	constructor(textures, duration, horizontalFlip, verticalFlip, diagonalFlip) {
		super(textures);
		if (this.textures.length && duration) {
			this.animationSpeed = 1000 / 60 / duration;
			this.gotoAndPlay(0);
		}

		this._hightlightFilter = new OutlineFilter(2, 0x99ff99);

		this.on('mouseover', this.onMouseOver)
			.on('mouseout', this.onMouseOut)
			.on('mouseup', this.onMouseUp);

		this.interactive = true;
		this.flip(horizontalFlip, verticalFlip, diagonalFlip);
	}

	onMouseOver() {
		this.alpha = 0.8;
		this.filters = [this._hightlightFilter];
	}

	onMouseOut() {
		this.alpha = 1;
		this.filters = [];
	}

	onMouseUp() {
		console.log(this);
	}

	flip(hFlip, vFlip, dFlip) {
		if (hFlip) {
			this.anchor.x = 1;
			this.scale.x = -1;
		}

		if (vFlip) {
			this.anchor.y = 1;
			this.scale.y = -1;
		}

		if (dFlip) {
			if (hFlip) {
				this.anchor.x = 0;
				this.scale.x = 1;
				this.anchor.y = 1;
				this.scale.y = 1;

				this.rotation = PIXI.DEG_TO_RAD * 90;
			}
			if (vFlip) {
				this.anchor.x = 1;
				this.scale.x = 1;
				this.anchor.y = 0;
				this.scale.y = 1;

				this.rotation = PIXI.DEG_TO_RAD * -90;
			}
		}
	}

}
