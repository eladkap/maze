/*
This class represents a moving object
*/

class Entity extends Tile {
  constructor(row, col, width, image, symbol, speed, map) {
    super(row, col, width, image, symbol);
    this.originalRow = row;
    this.originalCol = col;
    this.prevRow = row;
    this.prevCol = col;
    this.speed = speed;
    this.direction = createVector(0, 0);
    this.map = map;
    this.lerpingCount = 0;
    this.isLerping = false;
    this.vulnerable = false;
    this.lerpUnit = lerpSpeed;
  }

  //#region Properties
  get Speed() {
    return this.speed;
  }

  get Direction() {
    return this.direction;
  }

  get Vulnerable() {
    return this.vulnerable;
  }
  //#endregion

  //#region Methods
  Draw(refPos) {
    /* Draws the entity from ref position (camera position) */
    if (this.visible) {
      noStroke();
      textSize(this.width * 0.9);
      text(
        this.symbol,
        this.pos.x + refPos.x - this.width * 0.1,
        this.pos.y + refPos.y + this.width * 0.8
      );
    }
  }

  Move() {}

  SetOriginalPosition() {
    this.SetPosition(this.originalRow, this.originalCol);
  }

  ResetMovement() {
    /* Reset lerping movement after moving an entire tile */
    this.lerpingCount = 0;
    this.isLerping = false;
    this.lerpUnit = lerpSpeed;
    this.Move();
  }

  Update() {
    /* Update entity position */
    if (this.isLerping) {
      let x = lerp(
        this.pos.x,
        this.pos.x + this.direction.x * this.speed,
        this.lerpUnit
      );
      let y = lerp(
        this.pos.y,
        this.pos.y + this.direction.y * this.speed,
        this.lerpUnit
      );
      this.pos.set(x, y);
      this.lerpingCount++;
      if (this.lerpingCount >= 1 / this.lerpUnit) {
        this.ResetMovement();
      }
    }
  }

  SetVulnerable(value) {
    this.vulnerable = value;
  }

  SetDirection(directionX, directionY) {
    this.direction.set(directionX, directionY);
  }

  CanGoLeft() {
    return (
      this.col - 1 > 0 &&
      this.map.GetValue(this.row, this.col - 1) == null &&
      !this.isLerping
    );
  }

  CanGoRight() {
    return (
      this.col + 1 < this.map.Cols - 1 &&
      this.map.GetValue(this.row, this.col + 1) == null &&
      !this.isLerping
    );
  }

  CanGoUp() {
    return (
      this.row - 1 > 0 &&
      this.map.GetValue(this.row - 1, this.col) == null &&
      !this.isLerping
    );
  }

  CanGoDown() {
    return (
      this.row + 1 < this.map.Rows - 1 &&
      this.map.GetValue(this.row + 1, this.col) == null &&
      !this.isLerping
    );
  }

  GotoDirection(direction) {
    switch (direction) {
      case 'L':
        this.GoLeft();
        break;
      case 'R':
        this.GoRight();
        break;
      case 'U':
        this.GoUp();
        break;
      default:
        this.GoDown();
        break;
    }
  }

  GoLeft() {
    if (this.CanGoLeft()) {
      this.direction.set(-1, 0);
      this.isLerping = true;
      this.map.SetValue(this.row, this.col, null);
      this.prevCol = this.col;
      this.col--;
      this.map.SetValue(this.row, this.col, this);
    }
  }

  GoRight() {
    if (this.CanGoRight()) {
      this.direction.set(1, 0);
      this.isLerping = true;
      this.map.SetValue(this.row, this.col, null);
      this.prevCol = this.col;
      this.col++;
      this.map.SetValue(this.row, this.col, this);
    }
  }

  GoUp() {
    if (this.CanGoUp()) {
      this.direction.set(0, -1);
      this.isLerping = true;
      this.map.SetValue(this.row, this.col, null);
      this.prevRow = this.row;
      this.row--;
      this.map.SetValue(this.row, this.col, this);
    }
  }

  GoDown() {
    if (this.CanGoDown()) {
      this.direction.set(0, 1);
      this.isLerping = true;
      this.map.SetValue(this.row, this.col, null);
      this.prevRow = this.row;
      this.row++;
      this.map.SetValue(this.row, this.col, this);
    }
  }

  Stop() {
    this.SetDirection(0, 0);
    this.lerpingCount = 0;
  }

  IsFalling() {
    return this.isLerping;
  }

  Collide(entity) {
    var d = dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y);
    return d < (this.radius + entity.radius) / 2;
  }
  //#endregion
}
