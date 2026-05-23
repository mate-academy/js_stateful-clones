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
    if (action.type === 'addProperties') {
      for (const key of Object.keys(action.extraData)) {
        updatedState[key] = action.extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete updatedState[key];
      }
    } else if (action.type === 'clear') {
      for (const key of Object.keys(updatedState)) {
        delete updatedState[key];
      }
    }

    arrayWithStates.push({ ...updatedState });
  }

  return arrayWithStates;
}

module.exports = transformStateWithClones;
