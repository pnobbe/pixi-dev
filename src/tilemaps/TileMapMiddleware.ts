import * as tmx from 'tmx-parser';
import * as path from "path";
import {TilesetToSpritesheet} from "./TilesetToSpritesheet";
import { Spritesheet, LoaderResource } from 'pixi.js';

export function TileMapMiddleware() {
	return function (resource, next) {

		// Check if data is valid & not empty
		if (!resource.data ||
			!(resource.extension === 'tmx') ||
			resource.type !== LoaderResource.TYPE.XML ||
			!resource.data.children[0].getElementsByTagName('tileset')) {
			return next();
		}

		// Set parser config
		const route = path.dirname(resource.url.replace(this.baseUrl, ''));
		const loadOptions = {
			crossOrigin: resource.crossOrigin,
			parentResource: resource,
		};

		// Parse TMX file
		tmx.parse(resource.xhr.responseText, route, (err, map) => {
				if (err) throw err;

				const spritesheets = {};
				const loaded = [];
				map.tileSets.forEach(tileset => {
					loaded[tileset.firstGid] = false;
					TilesetToSpritesheet(tileset, route, loadOptions, (err, spritesheet: Spritesheet) => {
						spritesheets[spritesheet.data.meta.name] = spritesheet;
						loaded[spritesheet.data.meta.name] = true;

						if (loaded.every(isTrue)) {
							map.spritesheets = spritesheets;
							resource.data = map;
							next();
						}
					});
				});

			}
		);

	};
}

function isTrue(val): boolean {
	return val;
}
