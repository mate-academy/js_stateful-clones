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

  for (const key of actions) {
    const { type, extraData, keysToRemove } = key;

    switch (type) {
      case 'addProperties':
        currentState = { ...currentState, ...extraData };
        stateHistory.push(currentState);
        break;

      case 'removeProperties':
        currentState = { ...currentState }; // Clone the current state

        for (const i of keysToRemove) {
          delete currentState[i]; // Remove specified keys
        }
        stateHistory.push(currentState);
        break;

      case 'clear':
        currentState = {};
        stateHistory.push(currentState);
        break;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
