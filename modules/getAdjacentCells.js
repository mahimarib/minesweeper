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
        ([x, y]) => x >= 0 && x < maxCols && y >= 0 && y < maxRows
    );
}

export default getAdjacentCells;
