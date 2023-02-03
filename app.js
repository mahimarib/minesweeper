import { setFlagCount } from './modules/flagContext.js';
import Grid from './modules/Grid.js';

const gridElement = document.querySelector('.grid');

const rows = 15;
const cols = 20;
const bombs = 50;

setFlagCount(bombs);

new Grid(gridElement, rows, cols, bombs);
