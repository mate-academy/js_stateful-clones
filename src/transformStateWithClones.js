'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const workingState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    // Clear workingState
    if (action.type === 'clear') {
      for (const line in workingState) {
        delete workingState[line];
      }
    }

    // ADD property to the workingState
    if (action.type === 'addProperties') {
      for (const newProperty in action.extraData) {
        workingState[newProperty] = action.extraData[newProperty];
      }
    }

    // Remove property from the workingState
    if (action.type === 'removeProperties') {
      for (const removingKey of action.keysToRemove) {
        delete workingState[removingKey];
      }
    }

    stateHistory.push({ ...workingState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
