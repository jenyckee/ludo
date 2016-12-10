import * as pixi from 'pixi.js'
import Rx from 'rx'
import Draggable from './draggable'

import { createStore, applyMiddleware } from 'redux'

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
// var draggable = Draggable(texture, Math.random() * window.innerWidth, Math.random() * window.innerHeight)
var nonDraggable = Draggable(texture, 100, 100)
// stage.addChild(draggable);
stage.addChild(nonDraggable);
// console.log(nonDraggable)

renderer.backgroundColor = 0xFFFFFF;
resize()
requestAnimationFrame(animate)

var source = Rx.Observable.fromEvent(document, 'mousemove');

function mouse(x,y) {
  return {
    type: 'MESSAGE',
    x: x,
    y: y
  }
}

var subscription = source.subscribe(function (e) {
  store.dispatch(mouse(e.clientX, e.clientY))
});

////////////////////////////

function logger({ getState }) {
  return (next) => (action) => {
    return next(action)
  }
}

function mapStateToStage() {
  let state = store.getState()
  nonDraggable.position.x = state.x * window.devicePixelRatio
  nonDraggable.position.y = state.y * window.devicePixelRatio
}

const ACTION_HANDLERS = {
  ['MESSAGE'] : (state, action) => R.merge(state, { x: action.x, y: action.y })
}

function reducer(state = {}, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

let store = createStore(reducer, {}, applyMiddleware(logger))

// store.subscribe(mapStateToStage)

function animate() {

    requestAnimationFrame( animate );

    renderer.render(stage);
}
