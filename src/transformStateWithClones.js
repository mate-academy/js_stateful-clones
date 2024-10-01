'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  let currentState = { ...state };

  for (const action of actions) {
    let newState = { ...currentState };

    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        for (const [key, value] of Object.entries(extraData)) {
          newState[key] = value;
        }
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;
    }
    stateHistory.push(newState);
    currentState = newState;
  }

  return stateHistory; // Return the array of states
}

module.exports = transformStateWithClones;
