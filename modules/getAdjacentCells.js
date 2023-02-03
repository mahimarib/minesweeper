function getAdjacentCells(coordinates, maxRows, maxCols) {
    const [x, y] = coordinates;
    const possibleAdjCells = [
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1],
        [x - 1, y],
        [x + 1, y],
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
    ];

    return possibleAdjCells.filter(
        ([x, y]) => 0 <= y && y < maxCols && 0 <= x && x < maxRows
    );
}

export default getAdjacentCells;
