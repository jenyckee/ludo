function Draggable(texture, x, y)
{
  // create our little sprite friend..
  var sprite = new PIXI.Sprite(texture);
  //	sprite.width = 300;
  // enable the sprite to be interactive.. this will allow it to respond to mouse and touch events
  sprite.interactive = true;
  // this button mode will mean the hand cursor appears when you rollover the sprite with your mouse
  sprite.buttonMode = true;

  // center the sprites anchor point
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
  // make it a bit bigger, so its easier to touch
  sprite.scale.x = sprite.scale.y = 0.1;

  // use the mousedown and touchstart
  sprite.mousedown = sprite.touchstart = function(data) {
//		data.originalEvent.preventDefault()
    // store a refference to the data
    // The reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = data.data;
    this.alpha = 0.9;
    this.dragging = true;
    this.sx = this.data.getLocalPosition(sprite).x * sprite.scale.x;
    this.sy = this.data.getLocalPosition(sprite).y * sprite.scale.y;
  };

  // set the events for when the mouse is released or a touch is released
  sprite.mouseup = sprite.mouseupoutside = sprite.touchend = sprite.touchendoutside = function(data)
  {
    this.alpha = 1
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
  };

  // set the callbacks for when the mouse or a touch moves
  sprite.mousemove = sprite.touchmove = function(data)
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
  sprite.position.x = x;
  sprite.position.y = y;

  // add it to the stage
  return sprite;
}

export default Draggable
