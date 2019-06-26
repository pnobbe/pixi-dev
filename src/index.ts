import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { Stage, Layer} from 'pixi-layers';
import './tiled';
import Debug from './debug';
import './css/index.css';
import {TmxLoader} from "./loaders/TmxLoader";
import {TileMap} from "./tiled/TileMap";
import {TileMapMiddleware} from "./tiled/TileMapMiddleware";

// import { GridLayer, MapLayer, TokenLayer, GMLayer } from './layers';

const debug = true;

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

let app = new PIXI.Application({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 0x34034
});

document.body.appendChild(app.view);

// Create groups
const mapLayer = new PIXI.display.Group(0, true);
const debugLayer = new PIXI.display.Group(1, true);

// Create pixi-display stage
const displayStage = new Stage();
displayStage.group.enableSort = true;
app.stage = displayStage;

// Resize renderer together with window
window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

// Create viewport
const viewport = new Viewport({
    screenWidth: SCREEN_WIDTH,
    screenHeight: SCREEN_HEIGHT,
    interaction: app.renderer.plugins.interaction
});

viewport.parentGroup = mapLayer;
app.stage.addChild(viewport);

viewport
    .drag()
    .pinch()
    .wheel()
    .decelerate()
    .bounce();

app.stage.addChild(new Layer(mapLayer));
const debugr = new Debug(app);

if (debug) {
    app.stage.addChild(new Layer(debugLayer));
    debugr.parentGroup = debugLayer;
    app.stage.addChild(debugr);
}

const text = new PIXI.Text("", {fontSize: 16, fontFamily: 'SegoeUI'});
debugr.addText(text);

const loader = new TmxLoader();
const mapName = 'assets/island.tmx';

loader.onError.add(() => text.text = `Error loading map`);
loader.onProgress.add(() => text.text = `Map: Loading ${mapName}... ${loader.progress}%`);
loader.onComplete.add(() => text.text = `Map: ${mapName}`);

loader.add(mapName);
loader.load((loader, resources) => {
    /**
     *   PIXI.extras.TiledMap() is an extended PIXI.Container()
     *   so you can render it right away
     */
    let tileMap = new TileMap(resources[mapName]);
    viewport.addChild(tileMap);


    viewport.worldWidth = tileMap.width * tileMap.tileWidth;
    viewport.worldHeight = tileMap.height * tileMap.tileHeight;

});
