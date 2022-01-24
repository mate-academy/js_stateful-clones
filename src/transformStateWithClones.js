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

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(clone, extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          delete (clone[keyToRemove]);
        }
        break;

      case 'clear':
        for (const key in clone) {
          delete (clone[key]);
        }
        break;

      default:
        break;
    }
    arr.push({ ...clone });
  }

  return (arr);
}

module.exports = transformStateWithClones;
