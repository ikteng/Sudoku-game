# Sudoku Game 🎲

This project is an interactive Sudoku Game built using Python, Flask, JavaScript, and HTML/CSS. It provides a fun and educational way for users to play Sudoku while incorporating features to enhance gameplay, including dynamic hints and rule validation.

## Key Features:
- Puzzle Generation:
  - The backend generates randomized Sudoku puzzles with varying difficulties.
  - Each puzzle is unique and solvable, with a pre-calculated solution stored in the session.
- Interactive User Interface:
  - A clean and responsive UI built using HTML, CSS, and JavaScript.
  - Users can click cells to input numbers or use an on-screen numeric keypad.
- Real-Time Validation:
  - Invalid entries (non-numeric or duplicate values) are flagged dynamically.
  - Sudoku rules (no duplicates in rows, columns, or grids) are enforced via JavaScript.
- Hint System:
  - Users can request hints for empty cells.
  - Hints are generated using AI-driven logic that evaluates possible values based on the current board state.
- Solution Verification:
  - The backend checks the user’s solution against the stored correct solution.
  - Immediate feedback is provided on whether the solution is valid.
- Dynamic Rules Section:
  - The game includes an optional rules section that users can toggle on or off to understand Sudoku gameplay better.

## Technologies Used:
- Backend: Python, Flask
- Frontend: HTML, CSS, JavaScript
- Logic & Algorithms:
  - Puzzle generation and solving use backtracking.
  - Hint generation applies heuristic-based analysis.

## How It Works:
- Game Initialization:
  - A randomized puzzle is generated by the backend and displayed in the browser.
- Player Interaction:
  - Users input numbers into the grid following Sudoku rules.
  - Invalid inputs are highlighted for correction.
- Hint and Validation:
  - Users can request a hint or check their solution at any time.
  - The backend validates the solution or provides a helpful hint.
- Feedback:
  - Real-time visual feedback keeps the player informed of their progress and any mistakes.

## Setup Instructions
### Prerequisites
Ensure you have the following installed on your system:
- Python (3.7+)
- pip (Python package manager)
- Flask

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/ikteng/Sudoku-game.git
   cd sudoku
   ```

2. Install the required Python packages:
  ```bash
  pip install flask
  ```
3. Run the Flask server:
  ```bash
  python app.py
  ```
4. Open your browser and navigate to: http://127.0.0.1:5000/

## File Structure
- app.py: Main Flask application for serving endpoints and rendering templates.
- sudoku.py: Contains all the logic for puzzle generation, solving, validation, and hinting.
- templates/index.html: Frontend HTML structure.
- static/css/style.css: Custom styles for the UI.
- static/js/sudoku.js: Frontend logic for interacting with the board and handling user input.

## How to Play
1. Open the game in your browser (http://127.0.0.1:5000/)
2. Use the numeric keypad or type numbers directly into the empty cells.
3. Click Check Solution to validate your progress.
4. Click Get Hint for assistance when stuck.
5. Complete the board by filling each row, column, and 3x3 grid with numbers 1-9 without repetition.

## Rules
- Each row, column, and 3x3 grid must contain the numbers 1-9 without duplicates.
- Pre-filled numbers cannot be changed.
- Use hints sparingly for a more challenging experience.

Acknowledgments
Special thanks to the creators of Flask and the Sudoku puzzle algorithms for inspiring this project.
