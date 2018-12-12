import * as PIXI from 'pixi.js';
import Viewport from 'pixi-viewport';
import 'pixi-layers';
import './tilemap/index';
import Debug from './debug';
// import { GridLayer, MapLayer, TokenLayer, GMLayer } from './layers';

const debug = true;

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

let app = new PIXI.Application(SCREEN_WIDTH, SCREEN_HEIGHT, { backgroundColor: 0x34034 });
document.body.appendChild(app.view);

// Create layers
const mapLayer = new PIXI.display.Group(0, true);
const debugLayer = new PIXI.display.Group(1, true);

// Create pixi-display stage
app.stage = new PIXI.display.Stage();
app.stage.group.enableSort = true;



// Resize renderer together with window
window.addEventListener('resize', () => {
	app.renderer.resize(window.innerWidth, window.innerHeight);
});

const map = 'island.tmx';
const loader = PIXI.loader;

app.stage.addChild(new PIXI.display.Layer(mapLayer));
const debugr = new Debug();

if (debug) {
	app.stage.addChild(new PIXI.display.Layer(debugLayer));
	debugr.parentGroup = debugLayer;
	app.stage.addChild(debugr);
}

const text = new PIXI.Text("", { font: '16px SegoeUI' });
debugr.addText(text);

loader.add(map);

loader.onProgress.add(() => {
	text.text = `Map: Loading ${map}... ${loader.progress}%`;
});

loader.onComplete.add(() => {
	console.log(PIXI.loader);
	text.text = `Map: ${map}`;
});

loader.load(() => {
	/**
	 *   PIXI.extras.TiledMap() is an extended PIXI.Container()
	 *   so you can render it right away
	 */
	const tileMap = new PIXI.extras.TiledMap(map);
	const viewport = new Viewport({
		screenWidth: SCREEN_WIDTH,
		screenHeight: SCREEN_HEIGHT,
		worldWidth: tileMap._width * tileMap.tileWidth,
		worldHeight: tileMap._height * tileMap.tileHeight,
		interaction: app.renderer.interaction
	});

	viewport.parentGroup = mapLayer;
	app.stage.addChild(viewport);
	viewport.addChild(tileMap);

	viewport.fit(true, tileMap._width * tileMap.tileWidth, tileMap._height * tileMap.tileHeight);

	viewport
		.drag()
		.pinch()
		.wheel()
		.decelerate();

});
