class Stone extends Entity {
  constructor(row, col, width, img, symbol, speed, map) {
    super(row, col, width, img, symbol, speed, map);
    this.angle = 0;
  }

  Draw(refPos) {
    if (this.visible) {
      if (this.img != null) {
        image(
          this.img,
          this.pos.x + refPos.x + this.width / 2,
          this.pos.y + refPos.y + this.width / 2,
          this.width,
          this.width
        );
      } else {
        fill(STONE_COLORS[this.symbol]);
        ellipse(
          this.pos.x + this.width / 2 + refPos.x,
          this.pos.y + this.width / 2 + refPos.y,
          this.width,
          this.width
        );
      }
    }
  }

  Move() {
    if (GRAVITY) {
      this.GoDown();
    }
  }
}
