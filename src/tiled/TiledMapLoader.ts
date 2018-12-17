import * as tmx from 'tmx-parser';
import * as path from "path";
import {TileSetToTextureAtlas} from "./TileSetToTextureAtlas";

export function TiledMapLoader() {
	return function (resource, next) {

		// Check if data is valid & not empty
		if (!resource.data ||
			resource.type !== PIXI.loaders.Resource.TYPE.XML ||
			!resource.data.children[0].getElementsByTagName('tileset')) {
			return next();
		}

		// Set parser config
		const route = path.dirname(resource.url.replace(this.baseUrl, ''));

		// Parse TMX file
		tmx.parse(resource.xhr.responseText, route, (err, map) => {
			if (err) throw err;

			const atlases = TileSetToTextureAtlas(map, route);

			if (!atlases.length) {
				throw "No tilesets found";
			}

			const spritesheets = [];
			const hasLoaded = [];
			atlases.forEach(atlas => {
				hasLoaded[atlas.meta.name] = false;
			});

			// Load in tileset image sources
			atlases.forEach(atlas => {
				const baseTexture = PIXI.BaseTexture.fromImage(atlas.meta.image, null, PIXI.SCALE_MODES.LINEAR);
				const spritesheet = new PIXI.Spritesheet(baseTexture, atlas);

				spritesheet.parse(function (textures) {
					spritesheets[atlas.meta.image] = spritesheet;
					hasLoaded[atlas.meta.name] = true;
					if (baseTexture.hasLoaded && hasLoaded.every(val => {
						return val;
					})) {
						map.tileSets = spritesheets;
						debugger;
						resource.data = map;
						next();
					}
				});
			});


		});

	};
};
