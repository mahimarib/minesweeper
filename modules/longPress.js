function longPress(domElement, timeMs, flagFunc, clickFunc) {
    let timerID;
    let hasRun = false;

    const touchStart = event => {
        event.preventDefault();
        timerID = window.setTimeout(() => {
            flagFunc(event);
            hasRun = true;
        }, timeMs);
    };

    const touchEnd = event => {
        clearTimeout(timerID);
        if (!hasRun) clickFunc(event);
        hasRun = false;
    };

    domElement.addEventListener('touchstart', touchStart);
    domElement.addEventListener('touchend', touchEnd);

    return () => {
        domElement.removeEventListener('touchstart', touchStart);
        domElement.removeEventListener('touchend', touchEnd);
    };
}

export default longPress;
