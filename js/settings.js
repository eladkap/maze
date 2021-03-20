/* Screen settings */
const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;

const FPS = 30;
const TILE_SIZE = 25;

/* Map settings */
const MAP_POS_X = 0;
const MAP_POS_Y = 100;

const MAP_ROWS = 12;
const MAP_COLS = 30;

// const MAP_WIDTH = MAP_COLS * TILE_SIZE;
// const MAP_HEIGHT = MAP_ROWS * TILE_SIZE;

// LERP settings - Linear Interpolation - Animation movement unit
const LERP_UNIT_SLOW = 0.1;
const LERP_UNIT_NORMAL = 0.2;
const LERP_UNIT_FAST = 0.25;

const LERP_MODE_NORMAL = 1;
const LERP_MODE_SLOW = 2;

/* COLORS */
const BLACK = [0, 0, 0];
const BLACK1 = [20, 20, 20];
const WHITE = [255, 255, 255];
const GRAY0 = [50, 50, 50];
const GRAY1 = [100, 100, 100];
const GRAY2 = [150, 150, 150];
const GRAY3 = [200, 200, 200];
const RED = [220, 0, 0];
const ORANGE = [250, 150, 50];
const PINK = [250, 100, 150];
const BROWN = [200, 200, 0];
const YELLOW = [255, 255, 0];
const GREEN = [0, 100, 0];
const AQUA = [100, 255, 255];
const BLUE = [0, 0, 250];
const PURPLE = [200, 0, 250];
const NAVY = [0, 0, 128];
const DARK_BLUE = [0, 0, 64];

/* Murphy settings */
const MURPHY_RADIUS = TILE_SIZE / 2;
const MURPHY_SPEED = 1 * TILE_SIZE;

const MAX_LIVES = 5;

const INFOTRONS = 10;

/* Fonts */
const POINTS_FONT_SIZE = 20;
const FONT_FAMILY = 'College';
const MESSAGE_FONT_SIZE1 = 64;
const MESSAGE_FONT_SIZE2 = 32;
const MESSAGE_FONT_SIZE3 = 28;

/* Tile Symbols */
const MURPHY_SYMBOL = '🙂';
const FRAME_SYMBOL = '🔲';
const WALL_SYMBOL = '🟫';
const INFOTRON_SYMBOL = '💎';
const ZONK_SYMBOL = '🌑';
const EXIT_SYMBOL = 'E';
const EXPLOSION_SYMBOL = '💥';

const TILE_MURPHY = 'M';
const TILE_FRAME = 'F';
const TILE_EMPTY = '_';
const TILE_WALL = 'W';
const TILE_ZONK = 'Z';
const TILE_INFOTRON = 'I';
const TILE_EXIT = 'E';

const GRAVITY = false;

// const TILE_DICTIONARY = {
//   0: TILE_EMPTY,
//   1: TILE_ZONK,
//   2: TILE_BASE,
//   3: TILE_MURPHY,
//   4: TILE_INFOTRON,
//   5: TILE_WALL,
//   6: TILE_FRAME,
//   7: TILE_EXIT,
//   8: TILE_BOMB_ORANGE,
//   9: TILE_RIGHT_PORT,
//   10: TILE_DOWN_PORT,
//   11: TILE_LEFT_PORT,
//   12: TILE_UP_PORT,
//   17: TILE_SNIKSNAK,
//   18: TILE_BOMB_YELLOW,
//   19: TILE_TERMINAL,
//   20: TILE_BOMB_RED,
//   21: TILE_VER_PORT,
//   22: TILE_HOR_PORT,
//   23: TILE_CROSS_PORT,
//   24: TILE_ELECTRON,
//   25: TILE_BUG,
// };

/* Scoreboard settings */
const SCORE_BOARD_POS_X = SCREEN_WIDTH * 0.05;
const SCORE_BOARD_POS_Y = SCREEN_HEIGHT * 0.1;
const SCORE_BOARD_WIDTH = 100;
const SCORE_BOARD_HEIGHT = 200;

/* Game States */
const GAME_READY = 0;
const GAME_PLAY = 1;
const GAME_LEVEL_COMPLETED = 2;
const GAME_BUSTED = 3;
const GAME_PAUSED = 4;
const GAME_FINISHED = 5;
const GAME_OVER = 6;

const READY_DELAY_MS = 2000;
const BUG_DURATION_SEC = 2;

/* Image files */
const TILE_IMAGE_DICT = {
  infotron: 'images/modern/infotron.png',
  zonk: 'images/modern/zonk.png',
  wall: 'images/modern/wall.png',
  exit: 'images/modern/exit.png',
};

const DEMO_LEVEL_FILE = 'data/level_demo.txt';
const LEVELS_DATA_FILE_PATH = 'data/LEVELS.DAT';

const BYTES_PER_LEVEL = 1536;

const SPACE_KEY = 32;

const LOAD_DEMO_LEVEL = true;

const DEBUG_FLAG = true;
