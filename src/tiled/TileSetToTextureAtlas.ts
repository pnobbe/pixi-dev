import * as path from "path";

export function TileSetToTextureAtlas(tileSets, route) {
	const textureAtlases = [];

	tileSets.forEach(tileset => {
		const width = tileset.image.width;
		const height = tileset.image.height;
		const tileHeight = tileset.tileHeight;
		const tileWidth = tileset.tileWidth;

		const frames = {};
		const meta = {
			name: tileset.firstGid,
			app: "",
			image: path.join(route, tileset.image.source),
			format: null,
			size: { w: width, h: height },
			scale: 1
		};

		tileset.tiles.forEach(tile => {
			if (tile.animations.length) {
				tile.animations.forEach(anim => {
					frames[anim.tileId] = parseTile(anim.tileId, tileWidth, tileHeight, width);
				});
			} else {
				frames[tile.id] = parseTile(tile.id, tileWidth, tileHeight, width);
			}
		});

		textureAtlases.push({ frames, meta });
	});

	return textureAtlases;
}

function parseTile(id, tileWidth, tileHeight, width) {
	let x = id % (width / tileWidth) ;
	let y = Math.floor(id / (width / tileWidth));

	x = x * tileWidth;
	y = y * tileHeight;

	return {
		frame: {
			x: x,
			y: y,
			w: tileWidth,
			h: tileHeight
		},
		rotated: false,
		trimmed: false,
		spriteSourceSize: {
			x: 0,
			y: 0,
			w: tileWidth,
			h: tileHeight
		},
		sourceSize: {
			w: tileWidth,
			h: tileHeight
		}
	};
}
