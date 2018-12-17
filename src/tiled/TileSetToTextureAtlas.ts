import * as path from "path";

export function TileSetToTextureAtlas(map, route) {
	const tileSets = map.tileSets;
	const textureAtlases = [];

	const app = PIXI.autoDetectRenderer(500, 500);

	tileSets.forEach(tileset => {
		const mapWidth = tileset.image.width;
		const mapHeight = tileset.image.height;
		const tileHeight = tileset.tileHeight;
		const tileWidth = tileset.tileWidth;

		const frames = {};
		const meta = {
			app: "",
			version: map.version,
			image: path.join(route, tileset.image.source),
			format: null,
			size: { w: mapWidth, h: mapHeight },
			scale: 1
		};

		tileset.tiles.forEach(tile => {
			let x = tile.id % (mapWidth / tileWidth) ;
			let y = Math.floor(tile.id / (mapWidth / tileWidth));

			x = x * tileWidth;
			y = y * tileHeight;

			frames[tile.id] = {
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

		});
		textureAtlases.push({ frames, meta });

	});

	return textureAtlases;
}
