import * as pixi from 'pixi.js'
import Rx from 'rx'
import Draggable from './draggable'

var canvas = document.getElementById('canvas')
var w = window.innerWidth,
    h = window.innerHeight

const resize = () => {
  canvas.style.width = w + "px"
  canvas.style.height = h + "px"
}

var options = {
  view: canvas,
  antialias: true,
  resolution: window.devicePixelRatio
}

var renderer = new PIXI.CanvasRenderer(w, h, options)
var stage = new PIXI.Container()

var graph = new PIXI.Graphics();
graph.beginFill(0xFF3300);
graph.drawRect(0,0,300,300);
graph.endFill();
var texture = renderer.generateTexture(graph);
var draggable = Draggable(texture, Math.random() * window.innerWidth, Math.random() * window.innerHeight)
stage.addChild(draggable);

var nonDraggable = Draggable(texture, Math.random() * window.innerWidth, Math.random() * window.innerHeight)
stage.addChild(nonDraggable);

renderer.backgroundColor = 0xFFFFFF;
resize()
requestAnimationFrame(animate)

var source = Rx.Observable.fromEvent(document, 'mousemove');

var subscription = source.subscribe(function (e) {
  nonDraggable.position.x = e.clientX
  nonDraggable.position.y = e.clientY
});

function animate() {

    requestAnimationFrame( animate );
    // just for fun, lets rotate mr rabbit a little
  //stage.interactionManager.update();
    // render the stage
    renderer.render(stage);
}
