'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const newArray = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      Object.assign(clone, extraData);
    }

    if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete clone[key];
      }
    }

    if (type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
    }

    newArray.push({ ...clone });
  }

  return newArray;
}

module.exports = transformStateWithClones;
