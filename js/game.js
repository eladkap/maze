class Game {
  constructor(level) {
    this.level = level;
    this.murphy = null;
    this.tileMap = level.TileMap;
    this.state = GAME_READY;
    this.gravity = false;
    this.scoreBoard = null;
    this.map = null;
    this.cam = null;
    this.exitTile = null;
  }

  //#region Properties
  get Murphy() {
    return this.murphy;
  }

  get Tiles() {
    return this.tiles;
  }

  get State() {
    return this.state;
  }

  get Map() {
    return this.map;
  }
  //#endregion

  Setup() {
    this.SetMap(this.tileMap);
    this.SetMurphy();
    this.SetTiles();
    this.SetScoreBoard();
    this.SetCamera();
    this.SetPhysics();
    this.state = GAME_READY;
    console.log(this);
  }

  Update() {
    this.cam.Update(this.murphy);

    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
        if (tile != null) {
          tile.Draw(this.cam.pos);
          tile.Update();
          tile.Move();
        }
      }
    }
    this.murphy.Draw(this.cam.pos);
    this.murphy.Update();
    this.scoreBoard.Draw();
    this.scoreBoard.Update();
  }

  Reset() {
    this.SetState(GAME_PLAY);
    this.scoreBoard.Reset();
    this.scoreBoard.StopTimer();
    this.ResetMap();
    this.SetWallsColor(GRAY1);
    this.murphy.Stop();
    this.murphy.SetOriginalPosition();
    this.StopElements();
  }

  Resume() {
    this.SetState(GAME_PLAY);
    this.scoreBoard.StartTimer();
    this.SetWallsColor(GRAY1);
  }

  SetState(state) {
    this.state = state;
  }

  CalcInfotronsRequired() {
    let infotronsRequired = 0;
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        if (
          this.map.GetValue(row, col) != null &&
          this.map.GetValue(row, col).constructor.name == 'Stone'
        ) {
          infotronsRequired++;
        }
      }
    }
    return infotronsRequired;
  }

  SetScoreBoard() {
    // count infotrons required according to stones number
    let infotronsRequired = this.CalcInfotronsRequired();
    this.scoreBoard = new ScoreBoard(
      SCORE_BOARD_POS_X,
      SCORE_BOARD_POS_Y,
      SCORE_BOARD_WIDTH,
      SCORE_BOARD_HEIGHT,
      this.level.Number,
      this.level.Title,
      infotronsRequired
    );
  }

  SetMap(tileMap) {
    this.map = new Map(tileMap);
  }

  SetCamera() {
    this.cam = new Camera(
      MAP_POS_X,
      MAP_POS_Y,
      SCREEN_WIDTH,
      SCREEN_HEIGHT,
      this.map.Rows,
      this.map.Cols
    );
  }

  SetPhysics() {
    this.gravity = GRAVITY;
  }

  ResetMap() {
    this.map.Create(this.level.tileMap);
    this.SetTiles();
    this.state = GAME_READY;
  }

  SetMurphy() {
    for (let i = 0; i < this.map.Rows; i++) {
      for (let j = 0; j < this.map.Cols; j++) {
        let mapVal = this.map.GetValue(i, j);
        if (mapVal == TILE_MURPHY) {
          this.murphy = new Murphy(
            i,
            j,
            TILE_SIZE,
            null,
            MURPHY_SYMBOL,
            MURPHY_SPEED,
            this.map
          );
          this.map.matrix[i][j] = null;
        }
      }
    }
  }

  SetTiles() {
    for (let i = 0; i < this.map.Rows; i++) {
      for (let j = 0; j < this.map.Cols; j++) {
        let mapVal = this.map.GetValue(i, j);
        if (mapVal == TILE_EMPTY) {
          this.map.matrix[i][j] = null;
        } else if (mapVal == TILE_FRAME) {
          this.map.matrix[i][j] = new Wall(
            i,
            j,
            TILE_SIZE,
            tileImages['wall'],
            WALL_SYMBOL
          );
        } else if (mapVal == TILE_WALL) {
          this.map.matrix[i][j] = new Wall(
            i,
            j,
            TILE_SIZE,
            tileImages['wall'],
            WALL_SYMBOL
          );
        } else if (mapVal == TILE_ZONK) {
          this.map.matrix[i][j] = new Zonk(
            i,
            j,
            TILE_SIZE,
            tileImages['zonk'],
            ZONK_SYMBOL,
            MURPHY_SPEED,
            this.map
          );
        } else if (mapVal >= 'a' && mapVal <= 'z') {
          this.map.matrix[i][j] = new Stone(
            i,
            j,
            TILE_SIZE,
            null,
            mapVal,
            MURPHY_SPEED,
            this.map
          );
        } else if (mapVal == TILE_INFOTRON) {
          this.map.matrix[i][j] = new Infotron(
            i,
            j,
            TILE_SIZE,
            tileImages['infotron'],
            INFOTRON_SYMBOL,
            MURPHY_SPEED,
            this.map
          );
        } else if (mapVal == TILE_EXIT) {
          this.map.matrix[i][j] = new Exit(
            i,
            j,
            TILE_SIZE,
            tileImages['exit'],
            EXIT_SYMBOL
          );
          this.exitTile = this.map.matrix[i][j];
        }
      }
    }
  }

  CheckMurphyEatBase() {
    for (let i = this.tiles.length - 1; i >= 0; i--) {
      if (this.murphy.Collide(this.tiles[i])) {
        if (this.tiles[i] instanceof Base) {
          let base = this.tiles.splice(i, 1)[0];
        }
      }
    }
  }

  CheckMurphyCollidesBug() {
    // Return true if busted or not
    for (let i = this.tiles.length - 1; i >= 0; i--) {
      if (this.murphy.Collide(this.tiles[i])) {
        if (this.tiles[i] instanceof Bug && this.tiles[i].Activated) {
          console.log('bug!');
          return true;
        } else {
          let bug = this.tiles.splice(i, 1)[0];
        }
      }
    }
    return false;
  }

  SetWallsColor(color) {
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
        if (tile instanceof Wall) {
          // tile.SetForecolor(color);
        }
      }
    }
  }

  MoveElements() {
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
        if (tile != null) {
          tile.Move();
        }
      }
    }
  }

  StopElements() {
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
        if (tile != null && tile != 'M') {
          // console.log(tile);
          tile.Stop();
        }
      }
    }
  }

  MoveFallingElements() {
    let types = [Zonk, Infotron];
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
        for (let type of types) {
          if (tile instanceof type) {
            tile.GoDown();
          }
        }
      }
    }
  }

  HandleTilePushHorizotalOnly(tile, direction) {
    if (direction == 'U' || direction == 'D') {
      return;
    }
    if (direction == 'L' && this.murphy.CanPushLeft()) {
      this.MurphyPushLeft(tile);
      return;
    }
    if (direction == 'R' && this.murphy.CanPushRight()) {
      this.MurphyPushRight(tile);
      return;
    }
  }

  HandleTilePushHorizotalOrVertical(tile, direction) {
    if (direction == 'U' && this.murphy.CanPushUp()) {
      this.MurphyPushUp(tile);
      return;
    }
    if (direction == 'D' && this.murphy.CanPushDown()) {
      this.MurphyPushDown(tile);
      return;
    }
    if (direction == 'L' && this.murphy.CanPushLeft()) {
      this.MurphyPushLeft(tile);
      return;
    }
    if (direction == 'R' && this.murphy.CanPushRight()) {
      this.MurphyPushRight(tile);
      return;
    }
  }

  CheckStoneMergings(stone) {
    let symbol = stone.symbol;

    let stoneSet = new Set();
    // Check row
    let row = stone.Row;
    let col = stone.Col;
    while (
      col >= 0 &&
      this.map.GetValue(row, col) != null &&
      this.map.GetValue(row, col).symbol == symbol
    ) {
      stoneSet.add(this.map.GetValue(row, col));
      col--;
    }
    row = stone.Row;
    col = stone.Col;
    while (
      col < this.map.Cols &&
      this.map.GetValue(row, col) != null &&
      this.map.GetValue(row, col).symbol == symbol
    ) {
      stoneSet.add(this.map.GetValue(row, col));
      col++;
    }

    // Check col
    row = stone.Row;
    col = stone.Col;
    while (
      row >= 0 &&
      this.map.GetValue(row, col) != null &&
      this.map.GetValue(row, col).symbol == symbol
    ) {
      stoneSet.add(this.map.GetValue(row, col));
      row--;
    }
    row = stone.Row;
    col = stone.Col;
    while (
      row < this.map.Rows &&
      this.map.GetValue(row, col) != null &&
      this.map.GetValue(row, col).symbol == symbol
    ) {
      stoneSet.add(this.map.GetValue(row, col));
      row++;
    }
    let stones = Array.from(stoneSet);
    return Array.from(stones);
  }

  InteractWithTile(tile, direction) {
    if (tile == null) {
      this.murphy.GotoDirection(direction);
      return;
    }
    let className = tile.constructor.name;
    // wall
    if (['Wall'].includes(className)) {
      return;
    }
    // Exit
    if (className == 'Exit') {
      this.TryExitLevel();
      return;
    }
    // Zonk
    if (className == 'Zonk') {
      // this.HandleTilePushHorizotalOnly(tile, direction);
      this.HandleTilePushHorizotalOrVertical(tile, direction);
      return;
    }
    // Stone
    if (className == 'Stone') {
      // this.HandleTilePushHorizotalOnly(tile, direction);
      this.HandleTilePushHorizotalOrVertical(tile, direction);
      let mergedTiles = this.CheckStoneMergings(tile);

      if (mergedTiles.length > 1) {
        mergedTiles.forEach((mergedTile) => {
          let diamond = new Infotron(
            mergedTile.Row,
            mergedTile.Col,
            TILE_SIZE,
            tileImages['infotron'],
            INFOTRON_SYMBOL,
            MURPHY_SPEED,
            this.map
          );
          this.map.SetValue(mergedTile.Row, mergedTile.Col, diamond);
        });
      }
      return;
    }

    this.murphy.GotoDirection(direction);
  }

  ExitLevel() {
    console.log('Exit level');
    this.murphy.Hide();
    this.scoreBoard.SetMessage('Level completed!');
    noLoop();
  }

  TryExitLevel() {
    if (
      this.scoreBoard.infotronsCollected >= this.scoreBoard.infotronsRequired
    ) {
      this.ExitLevel();
    }
  }

  CollectTile() {
    // Collect tile
    let tile = this.map.matrix[this.murphy.Row][this.murphy.Col];
    if (tile == null) {
      return false;
    }
    let className = tile.constructor.name;
    if (className == 'Infotron') {
      this.map.matrix[tile.Row][tile.Col] = null;
      this.scoreBoard.IncrementInfotronsCollected();
      if (
        this.scoreBoard.infotronsCollected == this.scoreBoard.infotronsRequired
      ) {
        this.exitTile.SetImage(tileImages['exit_clear']);
      }
      return false;
    }
  }

  MoveMurphyRight() {
    let targetTile = this.map.GetValue(this.murphy.Row, this.murphy.Col + 1);
    this.InteractWithTile(targetTile, 'R');
  }

  MoveMurphyLeft() {
    let targetTile = this.map.GetValue(this.murphy.Row, this.murphy.Col - 1);
    this.InteractWithTile(targetTile, 'L');
  }

  MoveMurphyUp() {
    let targetTile = this.map.GetValue(this.murphy.Row - 1, this.murphy.Col);
    this.InteractWithTile(targetTile, 'U');
  }

  MoveMurphyDown() {
    let targetTile = this.map.GetValue(this.murphy.Row + 1, this.murphy.Col);
    this.InteractWithTile(targetTile, 'D');
  }

  MurphyCollectTileWithoutEntering(direction) {
    let location = this.murphy.Collect(direction);
    if (location != null) {
      for (let i = 0; i < this.map.Rows; i++) {
        for (let j = 0; j < this.map.Cols; j++) {
          let tile = this.map.matrix[i][j];
          if (tile instanceof Infotron) {
            if (
              tile.Row == location[0] &&
              tile.Col == location[1] &&
              !tile.isLerping
            ) {
              this.map.SetValue(location[0], location[1], null);
              this.scoreBoard.IncrementInfotronsCollected();
            }
          }
        }
      }
    }
  }

  MurphyPushLeft(tile) {
    if (
      tile.pos.y == this.murphy.pos.y &&
      this.murphy.pos.x - tile.pos.x == TILE_SIZE
    ) {
      tile.GoLeft();
      this.murphy.GoLeft();
      return;
    }
  }

  MurphyPushRight(tile) {
    if (
      tile.pos.y == this.murphy.pos.y &&
      tile.pos.x - this.murphy.pos.x == TILE_SIZE
    ) {
      tile.GoRight();
      this.murphy.GoRight();
      return;
    }
  }

  MurphyPushUp(tile) {
    if (
      tile.pos.x == this.murphy.pos.x &&
      this.murphy.pos.y - tile.pos.y == TILE_SIZE
    ) {
      tile.GoUp();
      this.murphy.GoUp();
      return;
    }
  }

  MurphyPushDown(tile) {
    if (
      tile.pos.x == this.murphy.pos.x &&
      tile.pos.y - this.murphy.pos.y == TILE_SIZE
    ) {
      tile.GoDown();
      this.murphy.GoDown();
      return;
    }
  }

  // for debugging
  CountElements(type) {
    let count = 0;
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
        if (tile instanceof type) {
          count++;
        }
      }
    }
    return count;
  }

  // for debugging
  GetTilesOf(type) {
    let tiles = [];
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
        if (tile instanceof type) {
          tiles.push(tile);
        }
      }
    }
    return tiles;
  }
}
