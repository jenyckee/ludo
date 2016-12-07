function createDot(texture, x, y)
{
  // create our little bunny friend..
  var bunny = new PIXI.Sprite(texture);
  //	bunny.width = 300;
  // enable the bunny to be interactive.. this will allow it to respond to mouse and touch events
  bunny.interactive = true;
  // this button mode will mean the hand cursor appears when you rollover the bunny with your mouse
  bunny.buttonMode = true;

  // center the bunnys anchor point
  bunny.anchor.x = 0.5;
  bunny.anchor.y = 0.5;
  // make it a bit bigger, so its easier to touch
  bunny.scale.x = bunny.scale.y = 0.1;

  // use the mousedown and touchstart
  bunny.mousedown = bunny.touchstart = function(data) {
//		data.originalEvent.preventDefault()
    // store a refference to the data
    // The reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = data.data;
    this.alpha = 0.9;
    this.dragging = true;
    this.sx = this.data.getLocalPosition(bunny).x * bunny.scale.x;
    this.sy = this.data.getLocalPosition(bunny).y * bunny.scale.y;
  };

  // set the events for when the mouse is released or a touch is released
  bunny.mouseup = bunny.mouseupoutside = bunny.touchend = bunny.touchendoutside = function(data)
  {
    this.alpha = 1
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
  };

  // set the callbacks for when the mouse or a touch moves
  bunny.mousemove = bunny.touchmove = function(data)
  {
    if(this.dragging)
    {
      // need to get parent coords..
      var newPosition = this.data.getLocalPosition(this.parent);
      // this.position.x = newPosition.x;
      // this.position.y = newPosition.y;
      this.position.x = newPosition.x - this.sx;
      this.position.y = newPosition.y - this.sy;
    }
  }

  // move the sprite to its designated position
  bunny.position.x = x;
  bunny.position.y = y;

  // add it to the stage
  return bunny;
}

export default createDot
