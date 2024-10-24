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
  let modifiedState = state;

  for (const key of actions) {
    let newState = { ...modifiedState };

    switch (key.type) {
      case 'addProperties':
        Object.assign(newState, key.extraData);
        break;

      case 'removeProperties':
        for (const del of key.keysToRemove) {
          delete newState[del];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        break;
    }

    stateHistory.push(newState);
    modifiedState = newState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
