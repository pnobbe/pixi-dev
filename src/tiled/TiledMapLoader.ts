import * as tmx from 'tmx-parser';
import * as path from "path";

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

			// Load in tileset image sources
			map.tileSets.forEach(tileset => {
				if (!(tileset.image.source in this.resources)) {
					this.add(tileset.image.source, `${route}/${tileset.image.source}`, loadOptions);
				}
			});

			resource.data = map;
			next();
		});

	};
};
