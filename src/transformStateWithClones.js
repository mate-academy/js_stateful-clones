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

    for (const action of actions) {
    const { type, ........ } = action;
    
    switch (type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'clear':
        currentState = {};
        break;

      case 'removeProperties':
        currentState = { ...currentState };

        for (const prop of action.keysToRemove) {
          delete currentState[prop];
        }
        break;
    }
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
