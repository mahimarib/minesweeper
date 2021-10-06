import getAdjacentCells from './getAdjacentCells.js';
import getImage from './getImage.js';

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

    this.adjCellsCoors = getAdjacentCells(
        this.coordinates,
        this.grid.rows,
        this.grid.cols
    );

    this.getAdjCells = () =>
        this.adjCellsCoors.map(coor => this.grid.getCell(coor));

    this.countBombs = () => {
        if (!this.hasBomb)
            this.getAdjCells().forEach(cell => {
                if (cell.hasBomb) this.bombCount++;
            });
    };

    this.displayBombCount = () => {
        if (this.bombCount) {
            this.state = 'number';
            this.element.classList.add(`_${this.bombCount}`);
            this.element.innerHTML = this.bombCount;
        } else {
            this.state = 'empty';
            this.clickAdjCells();
        }
    };

    this.displayBomb = () => {
        this.state = 'bomb';
        const bombElement = getImage('../assets/mine.svg');
        bombElement.classList.add('bomb');
        this.element.appendChild(bombElement);
        this.grid.hasBombClicked = true;
    };

    this.display = () => {
        this.element.classList.remove('hidden');
        this.hasBomb ? this.displayBomb() : this.displayBombCount();
    };

    this.setFlag = () => {
        this.state = 'flag';
        const flagElement = getImage('../assets/flag.svg');
        flagElement.classList.add('flag');
        this.element.appendChild(flagElement);
    };

    this.clickNumber = () => {
        const adjFlags = this.getAdjCells().filter(
            cell => cell.state === 'flag'
        ).length;
        if (this.bombCount === adjFlags)
            this.getAdjCells().forEach(cell => {
                if (cell.state === 'hidden') cell.handleClick();
            });
    };

    this.handleClick = () => {
        if (this.state === 'number') this.clickNumber();
        else this.display();
    };

    this.handleRightClick = () => {
        if (this.state === 'hidden') this.setFlag();
    };

    this.clickAdjCells = () =>
        this.getAdjCells().map(cell => {
            if (cell.state === 'hidden') cell.handleClick();
        });
}

export default Cell;
