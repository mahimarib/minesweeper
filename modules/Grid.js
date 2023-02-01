import Cell from './Cell.js';
import getAtomicValue from './getAtomicValue.js';
import shuffle from './shuffle.js';
import { onChange as flagOnChange } from './flagContext.js';

function Grid(domElement, rows, cols, bombCount) {
    this.rows = rows;
    this.cols = cols;
    this.bombCount = bombCount;

    const [getState, setState, onChange] = getAtomicValue({
        hasBombClicked: false,
        hiddenCells: this.rows * this.cols,
        numOfFlags: 0,
    });

    onChange(({ hasBombClicked, hiddenCells, numOfFlags }) => {
        if (hasBombClicked) {
            console.log('game over');
            domElement.removeEventListener('click', clickEvent);
            domElement.removeEventListener(
                'contextnemu',
                rightClickEvent,
                true
            );
        } else if (hiddenCells === numOfFlags) {
            console.log('YOU WON!!!!');
            domElement.removeEventListener('click', clickEvent);
            domElement.removeEventListener(
                'contextnemu',
                rightClickEvent,
                true
            );
        }
    });

    flagOnChange(flagsRemaining =>
        this.setState(prevState => ({
            ...prevState,
            numOfFlags: this.bombCount - flagsRemaining,
        }))
    );

    this.getState = getState;
    this.setState = setState;

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

    const clickEvent = event => {
        event.preventDefault();
        if (event.target.classList.contains('cell'))
            this.cells.get(event.target.id).handleClick();
    };

    const rightClickEvent = event => {
        const target = event.target;
        if (target.classList.contains('cell')) {
            this.cells.get(target.id).handleRightClick();
        } else if (target.nodeName === 'IMG') {
            this.cells.get(target.parentNode.id).handleRightClick();
        }
        event.preventDefault();
    };

    domElement.addEventListener('click', clickEvent);
    domElement.addEventListener('contextmenu', rightClickEvent);
}

export default Grid;
