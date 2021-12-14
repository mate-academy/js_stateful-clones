'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const arr = [];

  for (const ob of actions) {
    const temp = { ...ob };

    if (temp.type === 'addProperties') {
      const newData = temp.extraData;

      for (const key in newData) {
        clone[key] = newData[key];
      }
    }

    if (temp.type === 'removeProperties') {
      const removeProps = temp.keysToRemove;

      for (const prop of removeProps) {
        delete clone[prop];
      }
    }

    if (temp.type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
    }

    arr.push({ ...clone });
  }

  return arr;
}

module.exports = transformStateWithClones;
