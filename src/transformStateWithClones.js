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

  actions.forEach(action => {
    currentState = { ...currentState };

    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        if (key in currentState) {
          delete currentState[key];
        }
      }
    } else if (action.type === 'clear') {
      for (const key of Object.keys(currentState)) {
        delete currentState[key];
      }
    }

    stateHistory.push(currentState);
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
