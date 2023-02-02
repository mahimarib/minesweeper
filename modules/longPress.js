function longPress(domElement, timeMs, func) {
    let timerID;

    const mouseDown = event =>
        (timerID = window.setTimeout(() => longPress(event), timeMs));

    const mouseUp = () => clearTimeout(timerID);

    domElement.addEventListener('mousedown', mouseDown);

    domElement.addEventListener('mouseup', mouseUp);

    const longPress = event => {
        func(event);
        window.addEventListener('click', captureClick, true);
    };

    const captureClick = event => {
        event.stopPropagation();
        window.removeEventListener('click', captureClick, true);
    };

    return () => {
        domElement.removeEventListener('mousedown', mouseDown);
        domElement.removeEventListener('mouseup', mouseUp);
    };
}

export default longPress;
