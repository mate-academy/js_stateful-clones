'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  // Initialize a copy of the initial state
  const currentState = { ...state };

  // Iterate through the actions and create copies of the state for each action
  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        for (const key of Object.keys(currentState)) {
          delete currentState[key];
        }
        break;

      default:
        break;
    }

    // Push the copy of the state into the result array
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
