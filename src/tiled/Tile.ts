import {OutlineFilter} from '@pixi/filter-outline';
import {TileSet} from "./TileSet";
import {Image} from "./Image";

export class Tile extends PIXI.extras.AnimatedSprite {
	private readonly _id: number;
	private readonly _terrain: Array<any>;
	private readonly _probability: any;
	private readonly _properties: any;
	private readonly _objectGroups: Array<any>;
	private readonly _image: Image;

	private readonly _hightlightFilter: OutlineFilter;

	constructor(props, tileSet: TileSet, horizontalFlip, verticalFlip, diagonalFlip) {
		// Before we construct derived superclass (AnimatedSprite), translate our animation textures to a proper PIXI.Texture array
		let animationSpeed: number = 0;
		let textures: Array<PIXI.Texture> = [];
		if (props.animations.length) {
			animationSpeed = 1000 / 60 / props.animations[0].duration;
			props.animations.forEach(frame => {
				textures.push(tileSet.getTextureById(frame.tileId));
			});
		} else {
			textures.push(tileSet.getTextureByGid(props.gid));
		}

		super(textures);

		this._id = props.id;
		this._terrain = props.terrain;
		this._probability = props.probability;
		this._properties = props.properties;
		this._objectGroups = props.objectGroups;
		this._image = (props.image ? new Image(props.image) : null);

		if (this.textures.length) {
			this.animationSpeed = animationSpeed;
			this.gotoAndPlay(0);
		}

		this._hightlightFilter = new OutlineFilter(2, 0x99ff99);

		this.on('mouseover', this.onMouseOver)
			.on('mouseout', this.onMouseOut)
			.on('mouseup', this.onMouseUp);

		this.interactive = true;
		this.textures = textures;
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

	get id(): number {
		return this._id;
	}

	get image(): Image {
		return this._image;
	}
}
