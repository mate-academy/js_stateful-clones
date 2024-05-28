'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  let currentState = { ...state }; // Create a copy of the initial state

  for (const action of actions) {
    let nextState = { ...currentState }; // Create a copy of the current state for each action

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
        nextState = {}; // Clear all properties by assigning an empty object
        break;
    }

    result.push(nextState);
    currentState = nextState; // Update the current state for the next iteration
  }

  return result;
}
module.exports = transformStateWithClones;
