import * as path from "path";
import {BaseTexture, SCALE_MODES, Spritesheet } from "pixi.js";

export function TilesetToSpritesheet(tileset, route, loadOptions, cb) {
    if (tileset.source) {
        // Tileset is stored in TSX file instead of inline
        return parseTileset(parseTsx(tileset), route, loadOptions, cb);
    }
    return parseTileset(tileset, route, loadOptions, cb);
}

function parseTileset(tileset, route, loadOptions, cb) {
    const id = tileset.firstGid.toString();
    const url = path.join(route, tileset.image.source);
    const width = tileset.image.width;
    const height = tileset.image.height;
    const tileHeight = tileset.tileHeight;
    const tileWidth = tileset.tileWidth;

    // Init texture atlas
    const frames = {};
    const meta = {
        name: id,
        app: "",
        image: path.join(route, tileset.image.source),
        format: null,
        size: {w: width, h: height},
        scale: 1
    };


    // Fill texture atlas with frames
    tileset.tiles.forEach(tile => {

        // If tile has animations we parse those
        if (tile.animations.length) {
            tile.animations.forEach(anim => {
                frames[anim.tileId] = parseTile(anim.tileId, tileWidth, tileHeight, width);
            });
        } else {
            // Else treat it like a static frame
            frames[tile.id] = parseTile(tile.id, tileWidth, tileHeight, width);
        }
    });

    // Load the base texture
    const baseTexture = BaseTexture.from(meta.image, {
        scaleMode: SCALE_MODES.NEAREST,
        resourceOptions: {
            options: {
                crossOrigin: loadOptions.crossOrigin
            }
        }
    });

    baseTexture.on('loaded', baseTexture => {

        // Create a spritesheet from data and base texture
        const spritesheet = new Spritesheet(
            baseTexture,
            {meta, frames}
        );

        spritesheet.parse(() => {
            cb(null, spritesheet);
        });

    });

    baseTexture.on('error', error => cb(error, null));
}

function parseTile(id, tileWidth, tileHeight, width) {
    let x = id % (width / tileWidth);
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

function parseTsx(tileset) {
    throw "Please embed tileset in the map (Tiled)";
    // TODO
}
