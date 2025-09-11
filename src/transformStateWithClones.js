'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const newState = { ...state };
  let finalState = {};

  // write code here
  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete newState[keyToRemove];
        }
        break;
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
    }

    finalState = { ...newState };

    stateHistory.push(finalState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
