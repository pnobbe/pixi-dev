import * as PIXI from 'pixi.js';
import 'pixi-layers';

export const GridLayer = new PIXI.display.Group(0, false);
export const MapLayer = new PIXI.display.Group(1, false);
export const TokenLayer = new PIXI.display.Group(2, false);
export const GMLayer = new PIXI.display.Group(3, false);
