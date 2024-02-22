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
        currentState = delete transformStateWithClones.state;
        break;

      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          if (keyToRemove in currentState) {
            delete currentState[keyToRemove];
          }
        }
        break;
      default:
        break;
    }
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
