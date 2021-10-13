function getAtomicValue(value) {
    const callbacks = [];
    const getValue = () => value;
    const setValue = newValue => {
        value = newValue;
        callbacks.forEach(callback => callback(value));
    };
    const addHook = callback => {
        callbacks.push(callback);
    };
    return [getValue, setValue, addHook];
}

export default getAtomicValue;
