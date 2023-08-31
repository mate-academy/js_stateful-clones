'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state }; // Clone the initial state

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    // Clone the current state for the next iteration
    let nextState = { ...currentState };

    if (type === 'addProperties' && extraData) {
      nextState = {
        ...nextState, ...extraData,
      };
    } else if (type === 'removeProperties' && keysToRemove) {
      for (const key of keysToRemove) {
        delete nextState[key];
      }
    } else if (type === 'clear') {
      nextState = {};
    }

    result.push(nextState);
    currentState = nextState; // Update the current state for the next iteration
  }

  return result;
}

module.exports = transformStateWithClones;
