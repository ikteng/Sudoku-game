// Generate the Sudoku puzzle and populate the board
fetch('/generate')
    .then(response => response.json())
    .then(data => {
        const board = document.getElementById('board');
        for (let i = 0; i < 9; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < 9; j++) {
                let cell = document.createElement('td');
                let input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;

                // Add value to the input field and make it readonly for filled cells
                if (data[i][j] !== 0) {
                    input.value = data[i][j];
                    input.disabled = true;  // Make AI-filled cells readonly
                } else {
                    input.addEventListener('input', () => validateInput(input, i, j));
                }

                cell.appendChild(input);

                // Apply thicker border to the 3x3 grid boundaries
                if (i % 3 === 0) cell.style.borderTop = "3px solid black";
                if (j % 3 === 0) cell.style.borderLeft = "3px solid black";

                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    });

// Validate input to allow only numbers from 1 to 9
// Validate input to allow only numbers from 1 to 9
function validateInput(input, row, col) {
    const value = input.value;

    // Reset styles if the input is empty
    if (value === '') {
        input.style.borderColor = '';
        input.style.backgroundColor = '';
        return;
    }

    // Check if the input is a number between 1 and 9
    if (!/^[1-9]$/.test(value)) {
        input.style.borderColor = 'red';
        input.style.backgroundColor = '#fdd';

        // Refocus on the input to keep it selected
        input.focus();
        return; // Stop further checks if the input is invalid
    }

    // Check for Sudoku rule violations in the row, column, and subgrid
    const isRowValid = !checkRow(row, value, input);
    const isColValid = !checkColumn(col, value, input);
    const isSubgridValid = !checkSubgrid(row, col, value, input);

    // If any rule is violated, mark the input as invalid
    if (!isRowValid || !isColValid || !isSubgridValid) {
        input.style.borderColor = 'red';
        input.style.backgroundColor = '#fdd';

        // Refocus on the input to keep it selected
        input.focus();
    } else {
        input.style.borderColor = '';
        input.style.backgroundColor = '';
    }
}


// Check if the value is already in the row
function checkRow(row, value, input) {
    const inputs = document.querySelectorAll('input');
    for (let col = 0; col < 9; col++) {
        const otherInput = inputs[row * 9 + col];
        // Make sure the current input is not being compared with itself
        if (otherInput !== input && otherInput.value === value) {
            return true;  // Duplicate found
        }
    }
    return false;  // No duplicate found
}

// Check if the value is already in the column
function checkColumn(col, value, input) {
    const inputs = document.querySelectorAll('input');
    for (let row = 0; row < 9; row++) {
        const otherInput = inputs[row * 9 + col];
        // Make sure the current input is not being compared with itself
        if (otherInput !== input && otherInput.value === value) {
            return true;  // Duplicate found
        }
    }
    return false;  // No duplicate found
}

// Check if the value is already in the 3x3 subgrid
function checkSubgrid(row, col, value, input) {
    const inputs = document.querySelectorAll('input');
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            const otherInput = inputs[r * 9 + c];
            if (otherInput !== input && otherInput.value === value) {
                return true;
            }
        }
    }
    return false;
}

let selectedInput = null; // Track the currently selected input field

// Event listener to detect the selected input
document.addEventListener('click', (event) => {
    if (event.target.tagName === 'INPUT' && !event.target.disabled) {
        selectedInput = event.target; // Store the selected input field
    } else {
        selectedInput = null; // Clear if clicking outside an input
    }
});

// Function to set the selected input's value from the keypad
function setInput(number) {
    if (selectedInput) {
        selectedInput.value = number;
        validateInput(selectedInput, getRow(selectedInput), getCol(selectedInput));
    } else {
        alert("Please select a cell first!");
    }
}

// Function to clear the selected input's value
function clearInput() {
    if (selectedInput) {
        selectedInput.value = '';
        selectedInput.style.borderColor = '';
        selectedInput.style.backgroundColor = '';
    } else {
        alert("Please select a cell first!");
    }
}

// Utility functions to determine the row and column of an input
function getRow(input) {
    const inputs = Array.from(document.querySelectorAll('input'));
    return Math.floor(inputs.indexOf(input) / 9);
}

function getCol(input) {
    const inputs = Array.from(document.querySelectorAll('input'));
    return inputs.indexOf(input) % 9;
}

// Reset error styles when the user clears the input
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        if (input.value === '') {
            input.style.borderColor = '';
            input.style.backgroundColor = '';
        }
    });
});

// Request a hint from the server and update the board with the hint
function getHint() {
    const board = [];
    const inputs = document.querySelectorAll('input');
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            row.push(Number(inputs[i * 9 + j].value) || 0);
        }
        board.push(row);
    }

    fetch('/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ board: board })
    })
    .then(response => response.json())
    .then(hint => {
        if (hint && hint.row !== undefined && hint.col !== undefined) {
            const { row, col, value } = hint;
            const index = row * 9 + col;
            const inputField = inputs[index];
            inputField.value = value;
            inputField.style.color = "blue";
            inputField.style.fontWeight = "bold";
            inputField.style.backgroundColor = "#e0f7fa";
            setTimeout(() => {
                inputField.style.color = '';
                inputField.style.fontWeight = '';
                inputField.style.backgroundColor = '';
            }, 2000);
        } else {
            alert('No empty cells left or error in hint generation!');
        }
    });
}

// Function to toggle visibility of the rules section
function toggleRules() {
    const rulesContainer = document.getElementById('rules-container');
    const toggleButton = document.getElementById('toggle-rules-button');
    
    // Toggle the display of the rules container
    if (rulesContainer.style.display === 'none' || rulesContainer.style.display === '') {
        rulesContainer.style.display = 'block';  // Show rules
        toggleButton.innerText = 'Hide Rules';   // Change button text to "Hide Rules"
    } else {
        rulesContainer.style.display = 'none';   // Hide rules
        toggleButton.innerText = 'Show Rules';   // Change button text to "Show Rules"
    }
}

