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

  CheckNeighbors() {
    return;

    // right
    if (
      this.col + 1 < this.map.Cols &&
      this.map.GetValue(this.row, this.col + 1).symbol == this.symbol
    ) {
      console.log('R');
    }

    // left
    if (
      this.col - 1 >= 0 &&
      this.map.GetValue(this.row, this.col - 1).symbol == this.symbol
    ) {
      console.log('L');
    }

    // top
    if (
      this.row + 1 < this.map.Rows &&
      this.map.GetValue(this.row + 1, this.col).symbol == this.symbol
    ) {
      console.log('T');
    }

    // bottom
    if (
      this.row - 1 >= 0 &&
      this.map.GetValue(this.row - 1, this.col) == this.symbol
    ) {
      console.log('B');
    }
  }
}
