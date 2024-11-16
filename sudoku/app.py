from flask import Flask, render_template, request, jsonify, session
import sudoku
import secrets

app = Flask(__name__)

# Set a secret key for session management
app.secret_key = secrets.token_hex(16)  # Generates a random 16-byte key

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['GET'])
def generate():
    puzzle_data = sudoku.generate_puzzle()  # Get both puzzle and solution
    session['solution'] = puzzle_data['solution']  # Store the solution in the session
    return jsonify(puzzle_data['puzzle'])  # Send only the puzzle to the client

@app.route('/check', methods=['POST'])
def check_solution():
    data = request.get_json()
    user_board = data['board']
    solution = session.get('solution', [])
    
    if not solution:
        return jsonify({"valid": False, "error": "No solution available."})
    
    # Compare the user's board with the stored solution
    for i in range(9):
        for j in range(9):
            if user_board[i][j] != solution[i][j]:
                return jsonify({"valid": False})

    return jsonify({"valid": True})

@app.route('/hint', methods=['POST'])
def provide_hint():
    data = request.get_json()
    puzzle = data['board']

    # Get a hint from the puzzle using AI-driven logic
    solution = session.get('solution', [])
    if solution:
        hint = sudoku.get_hint(puzzle, solution)  # Use the AI-driven hint function
        if hint:
            return jsonify(hint)
    
    return jsonify({'row': -1, 'col': -1, 'value': 0})  # Return an empty hint if no valid hint

if __name__ == '__main__':
    app.run(debug=True)
