When player is colliding with an object (sitting ontop of it) the y vel will flicker between 0 and Game.World.gravity
Must measure velocity at update to get accurate actual output since that is the last function its passed through
THIS IS NORMAL COLLISION BEHAVIOUR

Objects Structure Explanation:

slip = how much an object ontop of this object will slip when accelerating
bounce = how much other objects colliding with this object will bounce
frictionCoeff = how much friction other objects will experience when colliding with this object
color = contains individual r, g, b, a values and rgba string
