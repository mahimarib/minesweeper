import getAtomicValue from './getAtomicValue.js';

const [getFlagCount, setFlagCount, onChange] = getAtomicValue(0);

export { getFlagCount, setFlagCount, onChange };
