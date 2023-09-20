'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state }; // Use the input state as the initial state

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    let nextState = { ...currentState }; // Declare nextState as a let

    if (type === 'addProperties' && extraData) {
      Object.assign(nextState, extraData);
    } else if (type === 'removeProperties' && keysToRemove) {
      for (const key of keysToRemove) {
        delete nextState[key];
      }
    } else if (type === 'clear') {
      nextState = {};
    }

    result.push(nextState);
    currentState = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;
