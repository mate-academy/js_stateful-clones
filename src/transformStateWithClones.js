'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStates = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    const clone = { ...state };

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
        for (const key in clone) {
          delete clone[key];
        }
        break;

      default:
        return 'Error : Type Unknown';
    }
    allStates.push(clone);
  }

  return allStates;
}

module.exports = transformStateWithClones;
