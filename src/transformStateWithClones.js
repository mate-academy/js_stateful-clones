'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentState = { ...state };
  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        const newState = { ...currentState };

        for (let j = 0; j < action.keysToRemove.length; j++) {
          const key = action.keysToRemove[j];

          delete newState[key];
        }
        currentState = newState;
        break;

      default:
        break;
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
