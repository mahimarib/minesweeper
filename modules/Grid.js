import Cell from './Cell.js';
import shuffle from './shuffle.js';

function Grid(domElement, rows, cols, bombCount) {
    this.rows = rows;
    this.cols = cols;
    this.bombCount = bombCount;

    const randomBombs = shuffle([
        ...Array(this.bombCount).fill(true),
        ...Array(this.rows * this.cols - this.bombCount).fill(false),
    ]);

    this.cells = new Map();

    this.getCell = ([x, y]) => this.cells.get(`${x}_${y}`);
    this.setCell = ([x, y], cell) => this.cells.set(`${x}_${y}`, cell);

    let c = 0;

    for (let x = 0; x < this.cols; x++)
        for (let y = 0; y < this.rows; y++)
            this.setCell([x, y], new Cell(this, [x, y], randomBombs[c++]));

    this.cells.forEach(cell => {
        domElement.appendChild(cell.element);
        cell.countBombs();
    });

    domElement.addEventListener('click', event => {
        if (event.target.classList.contains('cell'))
            this.cells.get(event.target.id).handleClick();
    });
}

export default Grid;
