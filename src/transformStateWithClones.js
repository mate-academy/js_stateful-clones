'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state }; // Create a clone of the initial state

  for (const action of actions) {
    const { type } = action;

    if (type === 'addProperties') {
      const { extraData } = action;

      currentState = {
        ...currentState, ...extraData,
      }; // Merge the extraData into the current state
    } else if (type === 'removeProperties') {
      const { keysToRemove } = action;

      for (const key of keysToRemove) {
        if (currentState.hasOwnProperty(key)) {
          delete currentState[key];
        }
      }
    } else if (type === 'clear') {
      currentState = {}; // Create an empty state object
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
