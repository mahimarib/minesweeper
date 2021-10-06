import getAdjacentCells from './getAdjacentCells.js';
import getBombSVG from './getBombSVG.js';

function Cell(grid, coordinates, hasBomb) {
    this.grid = grid;
    this.coordinates = coordinates;
    this.hasBomb = hasBomb;
    this.element = document.createElement('div');
    this.state = 'hidden';
    this.isClicked = false;
    this.bombCount = 0;

    const [x, y] = this.coordinates;

    this.element.classList.add('cell', 'hidden');
    this.element.setAttribute('id', `${x}_${y}`);

    this.adjCells = getAdjacentCells(
        this.coordinates,
        this.grid.rows,
        this.grid.cols
    );

    this.countBombs = () => {
        if (!this.hasBomb)
            this.adjCells.forEach(coor => {
                if (this.grid.getCell(coor).hasBomb) this.bombCount++;
            });
    };

    this.displayBombCount = () => {
        if (this.bombCount) {
            this.element.classList.add(`_${this.bombCount}`);
            this.element.innerHTML = this.bombCount;
        }
    };

    this.displayBomb = () => {
        if (this.hasBomb) this.element.appendChild(getBombSVG());
    };

    this.display = () => {
        this.element.classList.remove('hidden');
        this.hasBomb ? this.displayBomb() : this.displayBombCount();
    };

    this.handleClick = () => {
        if (this.isClicked) return;
        this.isClicked = true;
        this.display();
        if (this.hasBomb) {
            this.state = 'bomb';
        } else if (this.bombCount) {
            this.state = 'number';
        } else {
            this.state = 'empty';
            this.clickAdjCells();
        }
    };

    this.clickAdjCells = () => {
        this.adjCells.forEach(cellCoordinate =>
            this.grid.getCell(cellCoordinate).handleClick()
        );
    };
}

export default Cell;
