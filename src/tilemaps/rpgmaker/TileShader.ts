import {fillSamplers, generateFragmentSrc} from "../ShaderGenerator";
import { Buffer } from 'pixi.js';
import {AbstractTileShader} from "../AbstractTileShader";

import fragment from './RectTile.frag';
import vertex from './RectTile.vert';

export abstract class TilemapShader extends AbstractTileShader {
    constructor() {
        super(4, vertex, fragment);
    }
}
