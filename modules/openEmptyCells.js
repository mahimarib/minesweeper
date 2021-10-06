function openEmptyCells(cell, grid) {
    cell.adjCells.forEach(cellCoordinate =>
        grid.getCell(cellCoordinate).handleClick()
    );
}

export default openEmptyCells;
