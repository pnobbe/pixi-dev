import { Container, Text, Application }  from 'pixi.js';
// import { Viewport } from 'pixi-viewport';
import './tiled';
import Debug from './debug';
import './css/index.css';
import {TmxLoader} from "./loaders/TmxLoader";
import {TileMap} from "./tiled/TileMap";

// import { GridLayer, MapLayer, TokenLayer, GMLayer } from './layers';

const debug = true;

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

let app = new Application({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 0x34034
});

document.body.appendChild(app.view);

// Create stage
app.stage = new Container();
app.stage.sortableChildren = true;

// Create groups
const mapLayer = new Container();
const debugLayer = new Container();

// Set zIndex for layer sorting
mapLayer.zIndex = 0;
debugLayer.zIndex = 1;

// Resize renderer together with window
window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

// // Create viewport
// const viewport = new Viewport({
//     screenWidth: SCREEN_WIDTH,
//     screenHeight: SCREEN_HEIGHT,
//     interaction: app.renderer.plugins.interaction
// });

// viewport.parentGroup = mapLayer;
// app.stage.addChild(viewport);
//
// viewport
//     .drag()
//     .pinch()
//     .wheel()
//     .decelerate()
//     .bounce();

app.stage.addChild(mapLayer);
const debugr = new Debug(app);

if (debug) {
    app.stage.addChild(debugLayer);
    debugLayer.addChild(debugr);
}

const text = new Text("", {fontSize: 16, fontFamily: 'SegoeUI'});
debugr.addText(text);

const loader = new TmxLoader();
const mapName = 'assets/island.tmx';

loader.onError.add(() => text.text = `Error loading map`);
loader.onProgress.add(() => text.text = `Map: Loading ${mapName}... ${loader.progress}%`);
loader.onComplete.add(() => text.text = `Map: ${mapName}`);

loader.add(mapName);
loader.load((loader, resources) => {
    /**
     *   TiledMap() is an extended Container()
     *   so you can render it right away
     */
    let tileMap = new TileMap(resources[mapName]);
    app.stage.addChild(tileMap);
    // viewport.addChild(tileMap);
    //
    //
    // viewport.worldWidth = tileMap.width * tileMap.tileWidth;
    // viewport.worldHeight = tileMap.height * tileMap.tileHeight;

});
