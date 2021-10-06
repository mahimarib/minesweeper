import Cell from './Cell.js';
import shuffle from './shuffle.js';

class Grid {
    rows;
    cols;
    #bombCount;
    cells;

    constructor(rows, cols, bombCount) {
        this.rows = rows;
        this.cols = cols;
        this.#bombCount = bombCount;

        const randomBombs = shuffle([
            ...Array(bombCount).fill(true),
            ...Array(this.rows * this.cols - this.#bombCount).fill(false),
        ]);

        this.cells = new Map();

        let c = 0;

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.setCell([x, y], new Cell(this, [x, y], randomBombs[c++]));
            }
        }
    }

    mount(domElement) {
        this.cells.forEach(cell => {
            domElement.appendChild(cell.element);
            cell.countBombs();
        });
        domElement.addEventListener('click', event => {
            if (event.target.classList.contains('cell')) {
                this.cells.get(event.target.id).handleClick();
            }
        });
    }

    getCell([x, y]) {
        return this.cells.get(`${x}_${y}`);
    }

    setCell([x, y], cell) {
        this.cells.set(`${x}_${y}`, cell);
    }
}

export default Grid;
