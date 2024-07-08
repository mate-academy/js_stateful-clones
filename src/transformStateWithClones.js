'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        const updatedState = { ...currentState };

        action.keysToRemove.forEach((keyToRemove) => {
          delete updatedState[keyToRemove];
        });

        currentState = updatedState;
        break;

      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
