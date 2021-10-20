import { setFlagCount } from './modules/flagContext.js';
import Grid from './modules/Grid.js';

const gridElement = document.querySelector('.grid');

const rows = 10,
    cols = 10,
    bombs = 20;

setFlagCount(bombs);

new Grid(gridElement, rows, cols, bombs);
