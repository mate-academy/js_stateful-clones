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
    let newState;

    if (action.type === 'clear') {
      newState = {};
    } else if (action.type === 'addProperties') {
      newState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      newState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    }

    stateHistory.push(newState);
    currentState = newState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
