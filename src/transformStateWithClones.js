'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  let currentState = { ...state };

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        currentState = {
          ...currentState,
          ...act.extraData,
        };
        break;

      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of act.keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }

    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
