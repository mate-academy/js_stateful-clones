'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const result = [];

  for (const act of actions) {
    const { type, extraData, keysToRemove } = act;

    if (type === 'addProperties') {
      Object.assign(clone, extraData);
    }

    if (type === 'removeProperties') {
      for (const del of keysToRemove) {
        delete clone[del];
      }
    }

    if (type === 'clear') {
      for (const keyClone in clone) {
        delete clone[keyClone];
      }
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
