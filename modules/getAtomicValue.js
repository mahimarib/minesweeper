function getAtomicValue(value) {
    const callbacks = [];
    const getValue = () => value;
    const setValue = update => {
        value = typeof update === 'function' ? update(value) : update;
        callbacks.forEach(callback => callback(value));
    };
    const onChange = callback => {
        callbacks.push(callback);
    };
    return [getValue, setValue, onChange];
}

export default getAtomicValue;
