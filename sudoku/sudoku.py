import random

# Generates a full board (solved puzzle)
def generate_puzzle():
    full_board = generate_full_board()  # Complete board
    puzzle = remove_numbers(full_board)  # Puzzle with some numbers removed
    solution = full_board  # The solution is the full solved board
    return {'puzzle': puzzle, 'solution': solution}

# Generates a completely solved Sudoku board
def generate_full_board():
    board = [[0 for _ in range(9)] for _ in range(9)]
    solve_board(board)
    return board

# Simple backtracking Sudoku solver
def solve_board(board):
    def is_valid(board, row, col, num):
        for i in range(9):
            if board[row][i] == num or board[i][col] == num:
                return False
        start_row, start_col = 3 * (row // 3), 3 * (col // 3)
        for i in range(3):
            for j in range(3):
                if board[start_row + i][start_col + j] == num:
                    return False
        return True

    def solve(board):
        for row in range(9):
            for col in range(9):
                if board[row][col] == 0:
                    for num in range(1, 10):
                        if is_valid(board, row, col, num):
                            board[row][col] = num
                            if solve(board):
                                return True
                            board[row][col] = 0
                    return False
        return True

    solve(board)

# Removes random numbers from the completed board to create a puzzle
def remove_numbers(board):
    puzzle = [row[:] for row in board]
    num_removed = random.randint(40, 60)
    count = 0
    while count < num_removed:
        row = random.randint(0, 8)
        col = random.randint(0, 8)
        if puzzle[row][col] != 0:
            puzzle[row][col] = 0
            count += 1
    return puzzle

# Check if the solution is correct
def check_solution(board):
    for row in range(9):
        for col in range(9):
            if not is_valid(board, row, col, board[row][col]):
                return False
    return True

# AI-driven heuristic-based hint generation
def get_hint(board, solution):
    # Step 1: Evaluate the number of possible values for each empty cell
    empty_cells = []
    for row in range(9):
        for col in range(9):
            if board[row][col] == 0:
                possible_values = get_possible_values(board, row, col)
                empty_cells.append((row, col, possible_values))

    # Step 2: Sort the empty cells by the number of possible values
    empty_cells.sort(key=lambda x: len(x[2]))  # Prefer cells with fewer possible values

    # Step 3: Provide a hint for the first cell with the smallest number of possibilities
    if empty_cells:
        row, col, possible_values = empty_cells[0]
        # Check if there are possible values; if not, return None
        if possible_values:
            hint_value = possible_values[0]
            return {"row": row, "col": col, "value": hint_value}
    
    # If no empty cells are left or no possible values are found, return None
    return None

# Get possible values for a given cell by checking its row, column, and subgrid
def get_possible_values(board, row, col):
    used_values = set()

    # Check row and column
    for i in range(9):
        used_values.add(board[row][i])  # Row
        used_values.add(board[i][col])  # Column
    
    # Check 3x3 subgrid
    start_row, start_col = (row // 3) * 3, (col // 3) * 3
    for i in range(3):
        for j in range(3):
            used_values.add(board[start_row + i][start_col + j])

    # Possible values are 1-9, excluding those already used
    possible_values = [num for num in range(1, 10) if num not in used_values]
    return possible_values

# Validation function for checking if the number is valid in a specific cell
def is_valid(board, row, col, value):
    for i in range(9):
        if (board[row][i] == value) or (board[i][col] == value):
            return False
    start_row, start_col = (row // 3) * 3, (col // 3) * 3
    for i in range(3):
        for j in range(3):
            if board[start_row + i][start_col + j] == value:
                return False
    return True

