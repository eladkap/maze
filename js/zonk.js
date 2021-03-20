class Zonk extends Entity {
  constructor(row, col, width, image, symbol, speed, map, murphy) {
    super(row, col, width, image, symbol, speed, map, murphy);
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

  Move() {
    if (GRAVITY) {
      this.GoDown();
    }
  }
}
