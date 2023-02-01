import { setFlagCount } from './flagContext.js';
import getAdjacentCells from './getAdjacentCells.js';
import getAtomicValue from './getAtomicValue.js';
import getImage from './getImage.js';

function Cell(grid, coordinates, hasBomb) {
    this.hasBomb = hasBomb;
    this.bombCount = 0;
    const [getState, setState] = getAtomicValue('hidden');
    this.getState = getState;
    this.setState = setState;

    const [x, y] = coordinates;

    this.element = document.createElement('div');
    this.element.classList.add('cell', 'hidden');
    this.element.setAttribute('id', `${x}_${y}`);

    const adjCellsCoors = getAdjacentCells(coordinates, grid.rows, grid.cols);

    this.getAdjCells = () => adjCellsCoors.map(coor => grid.getCell(coor));

    this.countBombs = () => {
        if (!this.hasBomb)
            this.getAdjCells().forEach(cell => {
                if (cell.hasBomb) this.bombCount++;
            });
    };

    this.displayBombCount = () => {
        if (this.bombCount) {
            this.setState('number');
            this.element.classList.add(`_${this.bombCount}`);
            this.element.innerHTML = this.bombCount;
        } else {
            this.setState('empty');
            this.clickAdjCells();
        }
        grid.setState(prevState => ({
            ...prevState,
            hiddenCells: prevState.hiddenCells - 1,
        }));
    };

    this.displayBomb = () => {
        this.setState('bomb');
        const bombElement = getImage('assets/mine.svg');
        bombElement.classList.add('bomb');
        this.element.appendChild(bombElement);
        grid.setState(prevState => ({
            ...prevState,
            hasBombClicked: true,
        }));
    };

    this.display = () => {
        this.element.classList.remove('hidden');
        this.hasBomb ? this.displayBomb() : this.displayBombCount();
    };

    this.clickNumber = () => {
        const adjFlags = this.getAdjCells().filter(
            cell => cell.getState() === 'flag'
        ).length;
        if (this.bombCount === adjFlags)
            this.getAdjCells().forEach(cell => {
                if (cell.getState() === 'hidden') cell.display();
            });
    };

    this.handleClick = () => {
        if (this.getState() === 'number') this.clickNumber();
        else if (this.getState() !== 'flag') this.display();
    };

    this.handleRightClick = () => {
        if (
            this.getState() === 'hidden' &&
            grid.getState().numOfFlags < grid.bombCount
        ) {
            // set flag
            this.setState('flag');
            const flagElement = getImage('assets/flag.svg');
            flagElement.classList.add('flag');
            this.element.appendChild(flagElement);
            setFlagCount(prevCount => prevCount - 1);
        } else if (this.getState() === 'flag') {
            // remove flag
            this.element.innerHTML = '';
            this.setState('hidden');
            setFlagCount(prevCount => prevCount + 1);
        }
    };

    this.clickAdjCells = () =>
        this.getAdjCells().forEach(cell => {
            if (cell.getState() === 'hidden') cell.display();
        });
}

export default Cell;
