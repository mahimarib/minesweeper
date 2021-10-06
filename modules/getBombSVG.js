function getBombSVG() {
    const bombSVG = document.createElement('img');
    bombSVG.setAttribute('src', '../assets/mine.svg');
    bombSVG.classList.add('bomb');
    return bombSVG;
}

export default getBombSVG;
