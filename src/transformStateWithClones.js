'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];
  const clone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete clone[keyToRemove];
        }
        break;

      case 'clear':
        for (const keyToClear in clone) {
          delete clone[keyToClear];
        }
        break;

      default:
        break;
    }

    stateClones.push({ ...clone });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
