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
    let tileSet = new Set();
    // right
    if (
      this.map.GetValue(this.row, this.col + 1) != null &&
      this.col + 1 < this.map.Cols &&
      this.map.GetValue(this.row, this.col + 1).symbol == this.symbol
    ) {
      console.log('R');
      tileSet.add(this.map.GetValue(this.row, this.col + 1));
      tileSet.add(this);
    }

    // left
    if (
      this.map.GetValue(this.row, this.col - 1) != null &&
      this.col - 1 >= 0 &&
      this.map.GetValue(this.row, this.col - 1).symbol == this.symbol
    ) {
      console.log('L');
      tileSet.add(this.map.GetValue(this.row, this.col - 1));
      tileSet.add(this);
    }

    // top
    if (
      this.map.GetValue(this.row + 1, this.col) != null &&
      this.row + 1 < this.map.Rows &&
      this.map.GetValue(this.row + 1, this.col).symbol == this.symbol
    ) {
      console.log('T');
      tileSet.add(this.map.GetValue(this.row + 1, this.col));
      tileSet.add(this);
    }

    // bottom
    if (
      this.map.GetValue(this.row - 1, this.col) != null &&
      this.row - 1 >= 0 &&
      this.map.GetValue(this.row - 1, this.col) == this.symbol
    ) {
      console.log('B');
      tileSet.add(this.map.GetValue(this.row - 1, this.col));
      tileSet.add(this);
    }
    return Array.from(tileSet);
  }
}
