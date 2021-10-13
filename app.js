import getAtomicValue from './modules/getAtomicValue.js';
import Grid from './modules/Grid.js';

const gridElement = document.querySelector('.grid');

const rows = 10,
    cols = 10,
    bombs = 20;

export const flags = getAtomicValue(bombs);

const [, , addHook] = flags;

addHook(flags => console.log(flags));

const grid = new Grid(gridElement, rows, cols, bombs);
