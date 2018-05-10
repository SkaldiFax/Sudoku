const sudoku = [
	[0, 0, 0, 0, 0, 2, 1, 0, 0],
	[0, 0, 4, 0, 0, 8, 7, 0, 0],
	[0, 2, 0, 3, 0, 0, 9, 0, 0],
	[6, 0, 2, 0, 0, 3, 0, 4, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 5, 0, 6, 0, 0, 3, 0, 1],
	[0, 0, 3, 0, 0, 5, 0, 8, 0],
	[0, 0, 8, 2, 0, 0, 5, 0, 0],
	[0, 0, 9, 7, 0, 0, 0, 0, 0]
];

// Fill the sudoku container with stuff
const sudokuContainerElement = document.getElementById('Sudoku');

const sudokuElements = [];

for (var i = 0; i < 9; ++i) {
	const newRow = [];
	for (var j = 0; j < 9; ++j) {
		const newElement = document.createElement('div');
		newElement.classList.add('SudokuElement');
		newElement.id = `Sudoku-${i}-${j}`;
		newElement.style.gridRowStart = i+1;
		newElement.style.gridRowEnd = i+1;
		newElement.style.gridColumnStart = j+1;
		newElement.style.gridColumnEnd = j+1;
		sudokuContainerElement.appendChild(newElement);
		newRow.push(newElement);
	}
	sudokuElements.push(newRow);
}

const setValueOfSudokuElement = (i, j, value) => {
	if (value === 0) return;
	sudokuElements[i][j].innerHTML = value;
};

sudoku.forEach((row, i) => row.forEach((elt, j) => setValueOfSudokuElement(i, j, elt)));

const clearElementStyles = () => {
	for (let i = 0; i < 9; ++i) {
		for (let j = 0; j < 9; ++j) {
			sudokuElements[i][j].classList.remove('SudokuElement--selected');	
			sudokuElements[i][j].classList.remove('SudokuElement--highlighted');				
		}
	}
}

const selectElement = (i, j, format) => {
	clearElementStyles();
	if (format === 'row') {
		for (let k = 0; k < 9; ++k) {
			sudokuElements[i][k].classList.add(`SudokuElement--${k === j ? 'selected' : 'highlighted'}`);			
		}
	} else if (format === 'col') {
		for (let k = 0; k < 9; ++k) {
			sudokuElements[k][j].classList.add(`SudokuElement--${k === i ? 'selected' : 'highlighted'}`);			
		}
	} else if (format === 'squ') {
		for (let k = 0; k < 3; ++k) {
			for (let l = 0; l < 3; ++l) {
				const iRel = i - (i % 3) + k;
				const jRel = j - (j % 3) + l
				sudokuElements[iRel][jRel].classList.add(`SudokuElement--${(i === iRel) && (j === jRel) ? 'selected' : 'highlighted'}`);							
			}
		}
	}
};

for (let i = 0; i < 9; ++i) {
	for (let j = 0; j < 9; ++j) {
		setTimeout(() => {
			const randomValue = Math.random() * 3;
			const method = randomValue < 1 ? 'row' : randomValue < 2 ? 'col' : 'squ';
			selectElement(i, j, method);
		}, 100 * ((9 * i) + j));		
	}
}