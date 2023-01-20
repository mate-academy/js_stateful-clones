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

  for (const act of actions) {
    const { type, extraData, keysToRemove } = act;

    switch (type) {
      case 'addProperties':
        Object.assign(clone, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete clone[key];
        }
        break;

      case 'clear':
        for (const keys in clone) {
          delete clone[keys];
        }
        break;

      default:
        break;
    }

    arr.push({ ...clone });
  }

  return arr;
}

module.exports = transformStateWithClones;
