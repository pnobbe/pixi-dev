import * as tmx from 'tmx-parser';
import * as path from "path";
import {TileSetToTextureAtlas} from "./TileSetToTextureAtlas";

export function TiledMapMiddleware() {
	return function (resource, next) {

		// Check if data is valid & not empty
		if (!resource.data ||
			!(resource.extension === 'tmx') ||
			resource.type !== PIXI.loaders.Resource.TYPE.XML ||
			!resource.data.children[0].getElementsByTagName('tileset')) {
			return next();
		}

		// Set parser config
		const route = path.dirname(resource.url.replace(this.baseUrl, ''));

		// Parse TMX file
		tmx.parse(resource.xhr.responseText, route, (err, map) => {
				if (err) throw err;

				const atlases = TileSetToTextureAtlas(map.tileSets, route);

				const spritesheets = [];

				const hasLoaded = [];
				atlases.forEach(atlas => {
					hasLoaded[atlas.meta.name] = false;
				});

				const loadOptions = {
					crossOrigin: resource.crossOrigin,
					parentResource: resource,
				};

				// Load in tileset image sources
				atlases.forEach(atlas => {
						this.add(`${atlas.meta.name}`, atlas.meta.image, loadOptions, res => {
							if (res.error) {
								next(res.error);
								return;
							}

							res.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
							const spritesheet = new PIXI.Spritesheet(
								res.texture.baseTexture,
								atlas
							);

							spritesheet.parse(() => {
								spritesheets[atlas.meta.name] = spritesheet;

								hasLoaded[atlas.meta.name] = true;
								if (hasLoaded.every(isTrue)) {
									map.tileSets = spritesheets;
									resource.data = map;
									next();
								}

							});

						});
					}
				);


			}
		);

	};
};

function isTrue(val): boolean {
	return val;
}
