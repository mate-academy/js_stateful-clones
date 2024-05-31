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
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        currentState = { ...currentState };

        for (let j = 0; j < action.keysToRemove.length; j++) {
          const key = action.keysToRemove[j];

          delete currentState[key];
        }
        break;

      default:
        return 'write correct action type';
    }
    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
