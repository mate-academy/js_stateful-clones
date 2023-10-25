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
  let currentState = { ...state };

  // Iterate through the actions and create copies of the state for each action
  for (const action of actions) {
    const nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      case 'clear':
        for (const key of Object.keys(nextState)) {
          delete nextState[key];
        }
        break;

      default:
        break;
    }

    // Push the copy of the state into the result array
    result.push(nextState);
    currentState = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;
