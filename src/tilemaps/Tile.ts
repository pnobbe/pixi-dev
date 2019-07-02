import { DotFilter } from 'pixi-filters';
import { AnimatedSprite, DEG_TO_RAD, RAD_TO_DEG } from 'pixi.js';

export class Tile extends AnimatedSprite {
	private readonly _hightlightFilter: DotFilter;

	constructor(textures, durations, horizontalFlip, verticalFlip, diagonalFlip) {
		// Instantiate AnimatedSprite with given texture(s)
		super(textures);

		// Check if there are multiple textures (implies animation)
		if (textures.length > 1) {

			// Check if the animation durations equal
			// If they are equal we treat it as a single constant
			if (!this.allEqual(durations)) {

				// If they are not equal we want to change the animationSpeed on frame change.
				this.onFrameChange = currentFrame => {
					// this.animationSpeed = 1000 / 60 / this._durations[currentFrame-1];
				};
				// this._durations = durations;
			}

			// Start the animation
			this.animationSpeed = 1000 / 60 / durations[0];
			this.gotoAndPlay(0);
		}

		// Init properties
		this._hightlightFilter = new DotFilter();

		this.filters = [];

		this.interactive = true;

		this.on('mouseover', this.onMouseOver)
			.on('mouseout', this.onMouseOut)
			.on('mouseup', this.onMouseUp);

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

				this.rotation = DEG_TO_RAD * 90;
			}
			if (vFlip) {
				this.anchor.x = 1;
				this.scale.x = 1;
				this.anchor.y = 0;
				this.scale.y = 1;

				this.rotation = DEG_TO_RAD * -90;
			}
		}
	}

	allEqual = arr => arr.every(v => v === arr[0]);

}
