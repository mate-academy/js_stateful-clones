'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateChanged = { ...state };
  const statesList = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const keyToAdd in action.extraData) {
          stateChanged[keyToAdd] = action.extraData[keyToAdd];
        }
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateChanged[keyToRemove];
        }
        break;

      case 'clear':
        for (const key in stateChanged) {
          delete stateChanged[key];
        }
        break;

      default: statesList.push('No actions done');
    }

    statesList.push({ ...stateChanged });
  }

  return statesList;
}

module.exports = transformStateWithClones;
