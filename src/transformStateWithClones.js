'use strict';
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = state;

  for (const action of actions) {
    let newState;

    if (action.type === 'clear') {
      newState = {};
    } else if (action.type === 'addProperties') {
      newState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      newState = { ...currentState };

      if (action.keysToRemove) {
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
      }
    } else {
      newState = { ...currentState };
    }

    currentState = newState;
    stateHistory.push(currentState);
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
