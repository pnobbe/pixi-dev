import * as PIXI from 'pixi.js';
import * as Viewport from 'pixi-viewport';
import 'pixi-layers';
import './tiled';
import Debug from './debug';
import {TiledMapLoader, TileMap} from "./tiled";
import './css/index.css';

// import { GridLayer, MapLayer, TokenLayer, GMLayer } from './layers';

const debug = true;

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

let app = new PIXI.Application(SCREEN_WIDTH, SCREEN_HEIGHT, {backgroundColor: 0x34034});
document.body.appendChild(app.view);

// Create layers
const mapLayer = new PIXI.display.Group(0, true);
const debugLayer = new PIXI.display.Group(1, true);

// Create pixi-display stage

const displayStage = new PIXI.display.Stage();
displayStage.group.enableSort = true;
app.stage = displayStage;

// Resize renderer together with window
window.addEventListener('resize', () => {
	app.renderer.resize(window.innerWidth, window.innerHeight);
});


app.stage.addChild(new PIXI.display.Layer(mapLayer));
const debugr = new Debug();

if (debug) {
	app.stage.addChild(new PIXI.display.Layer(debugLayer));
	debugr.parentGroup = debugLayer;
	app.stage.addChild(debugr);
}

const text = new PIXI.Text("", {fontSize: 16, fontFamily: 'SegoeUI'});
debugr.addText(text);

const l = new PIXI.loaders.Loader();
l.use(TiledMapLoader());


const mapName = 'assets/island.tmx';
l.add(mapName);

l.onError.add((data) => {
	text.text = `Error loading map`;
});

l.onProgress.add(() => {
	text.text = `Map: Loading ${mapName}... ${l.progress}%`;
});

l.onComplete.add(() => {
	text.text = `Map: ${mapName}`;
});


console.log(l.resources);

l.load(() => {
	/**
	 *   PIXI.extras.TiledMap() is an extended PIXI.Container()
	 *   so you can render it right away
	 */

	const tileMap = new TileMap(mapName);
	const viewport = new Viewport({
		screenWidth: SCREEN_WIDTH,
		screenHeight: SCREEN_HEIGHT,
		worldWidth: tileMap.width * tileMap.tileWidth,
		worldHeight: tileMap.height * tileMap.tileHeight,
		interaction: app.renderer.plugins.interaction
	});

	viewport.parentGroup = mapLayer;
	app.stage.addChild(viewport);
	viewport.addChild(tileMap);

	viewport.fit(true, tileMap.width * tileMap.tileWidth, tileMap.height * tileMap.tileHeight);

	viewport
		.drag()
		.pinch()
		.wheel()
		.decelerate();

});
