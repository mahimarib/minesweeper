function getAtomicValue(value) {
    const callbacks = [];
    const getValue = () => value;
    const setValue = newValue => {
        value = newValue;
        callbacks.forEach(callback => callback());
    };
    const persistChange = callback => {
        callbacks = [...callback, callback];
    };
    return [getValue, setValue, persistChange];
}

export default getAtomicValue;
