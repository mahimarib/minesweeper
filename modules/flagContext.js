import getAtomicValue from './getAtomicValue.js';

const [getFlagCount, setFlagCount, addHook] = getAtomicValue(0);

export { getFlagCount, setFlagCount, addHook };
