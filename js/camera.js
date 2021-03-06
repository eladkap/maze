/**
 * This class represents the game camera tracking the player
 */

class Camera {
  /*
  x: camera x position in pixels
  y: camera y position in pixels
  width: camera width in pixels
  height: camera height in pixels
  */
  constructor(x, y, width, height, rows, cols) {
    this.pos = createVector(x, y);
    this.topLeft = createVector(x, y);
    this.width = width;
    this.height = height;
    this.mapWidth = TILE_SIZE * cols;
    this.mapHeight = TILE_SIZE * rows;
  }

  get Width() {
    /* Return camera width */
    return this.width;
  }

  get Height() {
    /* Return camera height */
    return this.height;
  }

  Update(target) {
    /* Update camera top-left position according to target element */
    let x = -target.pos.x + int(this.width / 2);
    let y = -target.pos.y + int(this.height / 2);
    x = Math.min(0, x);
    y = Math.min(0, y);
    x = Math.max(this.width - this.mapWidth, x);
    y = Math.max(this.height - this.mapHeight - this.topLeft.y, y);
    this.pos.set(x, y);
  }
}
