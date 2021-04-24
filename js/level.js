class Level {
  constructor(levelTextLines) {
    /*
    ordering: level number
    size: level dimensions
    title: level number
    tileMap: tile map
    diamondsRequired: required diamonds to complete the level
    gravity: true if there is gravity or false otherwise
     */
    this.levelTextLines = levelTextLines;
    this.ordering = null;
    this.size = null;
    this.tileMap = null;
    this.title = null;
    this.diamondsRequired = null;
    this.gravity = false;
  }

  Set() {
    let lines = this.levelTextLines;

    // ordering
    this.ordering = lines[0].split('=')[1];

    // dimensions
    let dimensions = lines[1].split('=')[1];
    let sizeStr = dimensions.split(',');
    this.size = [int(sizeStr[0]), int(sizeStr[1])];

    // title
    this.title = lines[1].split('=')[1];

    // gravity
    this.gravity =
      lines[5].split('=')[1].toLowerCase() == 'true' ? true : false;

    // tile map
    this.tileMap = lines.slice(6, 6 + this.size[0]);
  }

  get Number() {
    /* Return level number */
    return this.number;
  }

  get Title() {
    /* Return level title */
    return this.title;
  }

  get TileMap() {
    /* Return level tile map */
    return this.tileMap;
  }

  get InfotronsRequired() {
    /* Return required infotrons */
    return this.infotronsRequired;
  }
}
