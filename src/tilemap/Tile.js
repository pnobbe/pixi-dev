import { OutlineFilter } from '@pixi/filter-outline';

export default class Tile extends PIXI.extras.AnimatedSprite {
    hightlightFilter = new OutlineFilter(2, 0x99ff99);

    constructor(tile, tileSet, horizontalFlip, verticalFlip, diagonalFlip) {
        let textures = [];

        if (tile.animations.length) {
            tile.animations.forEach(frame => {
                textures.push(tileSet.textures[frame.tileId]);
            });
        }
        else {
            textures.push(tileSet.textures[tile.gid - tileSet.firstGid]);
        }

        super(textures);

		this.mouseover = this.onMouseOver;
		this.mouseout = this.onMouseOut;
		this.mouseup = this.onMouseUp;

        this.interactive = true;
        this.textures = textures;
        this.tile = tile;
        this.tileSet = tileSet;
        this.horizontalFlip = horizontalFlip;
        this.verticalFlip = verticalFlip;
        this.diagonalFlip = diagonalFlip;

        Object.assign(this, tile);

        this.flip();
    }

	onMouseOver(e) {
        this.alpha = 0.8;
		this.filters = [this.hightlightFilter];
	}

	onMouseOut(e) {
        this.alpha = 1;
		this.filters = [];
	}

	onMouseUp(e) {
        console.log(this.tile);
    }

    flip() {
        if (this.horizontalFlip) {
            this.anchor.x = 1;
            this.scale.x = -1;
        }

        if (this.verticalFlip) {
            this.anchor.y = 1;
            this.scale.y = -1;
        }

        if (this.diagonalFlip) {
            if (this.horizontalFlip) {
                this.anchor.x = 0;
                this.scale.x = 1;
                this.anchor.y = 1;
                this.scale.y = 1;

                this.rotation = PIXI.DEG_TO_RAD * 90;
            }
            if (this.verticalFlip) {
                this.anchor.x = 1;
                this.scale.x = 1;
                this.anchor.y = 0;
                this.scale.y = 1;

                this.rotation = PIXI.DEG_TO_RAD * -90;
            }
        }
    }
}
