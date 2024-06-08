'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        stateHistory.push({ ...currentState });
        break;

      case 'removeProperties':
        for (const ch of action.keysToRemove) {
          if (currentState.hasOwnProperty(ch)) {
            delete currentState[ch];
          }
        }
        stateHistory.push({ ...currentState });
        break;

      case 'clear':
        for (const j in currentState) {
          if (currentState.hasOwnProperty(j)) {
            delete currentState[j];
          }
        }
        stateHistory.push({ ...currentState });
        break;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
