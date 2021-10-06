import getAdjacentCells from './getAdjacentCells.js';
import getBombSVG from './getBombSVG.js';
import openEmptyCells from './openEmptyCells.js';

class Cell {
    coordinates;
    hasBomb;
    element;
    #grid;
    adjCells;
    bombCount = 0;
    state = 'hidden';
    isClicked = false;

    constructor(grid, coordinates, hasBomb) {
        this.#grid = grid;
        this.coordinates = coordinates;
        this.hasBomb = hasBomb;
        this.element = document.createElement('div');
        const [x, y] = this.coordinates;
        this.element.setAttribute('id', `${x}_${y}`);
        this.element.classList.add('cell', 'hidden');
        this.adjCells = getAdjacentCells(
            this.coordinates,
            this.#grid.rows,
            this.#grid.cols
        );
    }

    // only use this method when all the cells are created.
    countBombs() {
        if (!this.hasBomb) {
            this.adjCells.forEach(coor => {
                if (this.#grid.getCell(coor).hasBomb) this.bombCount++;
            });
        }
    }

    displayBombCount() {
        if (this.bombCount) {
            this.element.innerHTML = this.bombCount;
            this.element.classList.add(`_${this.bombCount}`);
        }
    }

    displayBomb() {
        if (this.hasBomb) {
            this.element.appendChild(getBombSVG());
        }
    }

    display() {
        this.element.classList.remove('hidden');
        this.hasBomb ? this.displayBomb() : this.displayBombCount();
    }

    hide() {
        this.element.innerHTML = '';
        this.element.classList.remove(`_${this.bombCount}`);
        this.element.classList.add('hidden');
    }

    handleClick() {
        if (this.isClicked) return;
        this.isClicked = true;
        this.display();
        if (this.hasBomb) {
            this.state = 'bomb';
        } else if (this.bombCount) {
            this.state = 'number';
        } else {
            this.state = 'empty';
            openEmptyCells(this, this.#grid);
        }
    }
}

export default Cell;
