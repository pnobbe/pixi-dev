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
		const loadOptions = {
			crossOrigin: resource.crossOrigin,
			loadType: PIXI.loaders.Resource.LOAD_TYPE.IMAGE,
			parentResource: resource
		};

		// Parse TMX file
		tmx.parse(resource.xhr.responseText, route, (err, map) => {
			if (err) throw err;

			const atlases = TileSetToTextureAtlas(map, route);

			// Load in tileset image sources
			atlases.forEach(atlas => {
				if (!(atlas.meta.image.source in this.resources)) {
					this.add(atlas.meta.image, atlas.meta.image, loadOptions);
				}
			});
			map.textureAtlas = atlases;

			resource.data = map;
			next();
		});

	};
};
