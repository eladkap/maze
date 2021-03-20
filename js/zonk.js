class Zonk extends Entity {
  constructor(row, col, width, image, symbol, speed, map) {
    super(row, col, width, image, symbol, speed, map);
    this.angle = 0;
  }

  Draw(refPos) {
    if (this.visible) {
      image(
        this.image,
        this.pos.x + refPos.x + this.width / 2,
        this.pos.y + refPos.y + this.width / 2,
        this.width,
        this.width
      );
    }
  }

  // Update() {}

  Move() {
    if (GRAVITY) {
      this.GoDown();
    }
  }
}
