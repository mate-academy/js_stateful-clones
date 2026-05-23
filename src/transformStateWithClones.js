'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayWithStates = [];
  const updatedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key of Object.keys(action.extraData)) {
          updatedState[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete updatedState[key];
        }
        break;
      case 'clear':
        for (const key of Object.keys(updatedState)) {
          delete updatedState[key];
        }
        break;
      default:
        continue;
    }
    arrayWithStates.push({ ...updatedState });
  }

  return arrayWithStates;
}

module.exports = transformStateWithClones;
