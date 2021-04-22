import os
import sys
import argparse
import random

"""
Generate custom level

Arguments:
Ordering - level ordering (CC-NNN)
Title - level title
Length - maze length
Width - maze width
Grid - grid rows and columns (3,5)
Stones - stones list (2a,3b,2c,...)
Zonks - zonks density
Player - player position
Exit - exit position
Gravity - gravity flag (True/False)
"""


def create_maze_frame(maze):
    rows = len(maze)
    cols = len(maze[0])

    # top row
    for c in range(cols):
        maze[0][c] = 'F'

    # bottom row
    for c in range(cols):
        maze[-1][c] = 'F'

    # left column
    for r in range(rows):
        maze[r][0] = 'F'

    # right column
    for r in range(rows):
        maze[r][-1] = 'F'


def create_grid(maze, grid):
    grid_rows_cols= grid.split(',')
    grid_rows = int(grid_rows_cols[0])
    grid_cols = int(grid_rows_cols[1])

    rows = len(maze)
    cols = len(maze[0])

    row_step = rows // grid_rows
    col_step = cols // grid_cols

    # rows
    row_indices = range(row_step, rows-1, row_step)
    for i in row_indices:
        for j in range(1, cols-1):
            maze[i][j] = 'W'

    # columns
    col_indices = range(col_step, cols-1, col_step)
    for j in col_indices:
        for i in range(1, rows-1):
            maze[i][j] = 'W'

    # entrances in rows
    col_ranges = []
    for j in range(1, cols-1, col_step):
        col_ranges.append(range(j, j+col_step-2))

    for row_index in row_indices:
        for col_range in col_ranges:
            chosen_col = random.choice(col_range)
            maze[row_index][chosen_col] = '_'

    # entrances in columns
    row_ranges = []
    for i in range(1, rows-1, row_step):
        row_ranges.append(range(i, i+row_step-2))

    for col_index in col_indices:
        for row_range in row_ranges:
            chosen_row = random.choice(row_range)
            maze[chosen_row][col_index] = '_'


def set_tile_position(maze, tile_pos, symbol):
    tile_row_col = tile_pos.split(',')
    tile_row = int(tile_row_col[0])
    tile_col = int(tile_row_col[1])
    maze[tile_row][tile_col] = symbol

def set_player_position(maze, player_pos):
    set_tile_position(maze, player_pos, 'M')

def set_exit_position(maze, exit_pos):
    set_tile_position(maze, exit_pos, 'E')

def set_zonks(maze, zonks_density):
    pass

def set_stones(maze, stones):
    pass

def gen_level(args):
    maze = []
    ordering = args.ordering
    title = args.title
    length = args.length
    width = args.width
    grid = args.grid
    stones = args.stones
    zonks_density = args.zonks
    player_pos = args.player
    exit_pos = args.exit

    for i in range(width):
        maze.append(['_'] * length)

    create_maze_frame(maze)

    create_grid(maze, grid)

    set_player_position(maze, player_pos)

    set_exit_position(maze, exit_pos)

    set_zonks(maze, zonks_density)

    set_stones(maze, stones)

    return maze
    


def write_level_to_file(file_path, maze, args):
    lines = []

    lines.append(f'title={args.title}')
    lines.append(f'title={args.title}')
    for row in maze:
        lines.append(row)

    with open(file_path,'r') as writer:
        writer.writelines(lines)


if __name__ == '__main__':
    parser = argparse.ArgumentParser('Generate maze level')
    parser.add_argument('-o', '--ordering', help='Level ordering', type=str)
    parser.add_argument('-t', '--title', help='Level title', type=str)
    parser.add_argument('-l', '--length', help='Maze length', type=int)
    parser.add_argument('-w', '--width', help='Maze width', type=int)
    parser.add_argument('-g', '--grid', help='Maze grid', type=str)
    parser.add_argument('-s', '--stones', help='Stones list', type=str)
    parser.add_argument('-z', '--zonks', help='Zonks density', type=float)
    parser.add_argument('-y', '--gravity', help='Gravity flag', type=bool)
    parser.add_argument('-p', '--player', help='Player position', type=str)
    parser.add_argument('-e', '--exit', help='Exit position', type=str)

    args = parser.parse_args()

    maze = gen_level(args)

    for row in maze:
        print(' '.join(row))