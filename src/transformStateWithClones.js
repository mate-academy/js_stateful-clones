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
    let nextStateClone;

    switch (action.type) {
      case 'clear':
        nextStateClone = {};
        break;

      case 'addProperties':
        nextStateClone = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        nextStateClone = { ...currentState };

        for (const key of action.keysToRemove) {
          delete nextStateClone[key];
        }
        break;

      default:
        nextStateClone = { ...currentState };
    }

    stateHistory.push(nextStateClone);
    currentState = nextStateClone;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
