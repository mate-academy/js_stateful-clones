'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const extraData = action.extraData;

      currentState = { ...currentState, ...extraData };
    } else if (action.type === 'removeProperties') {
      const keysToRemove = action.keysToRemove;

      currentState = { ...currentState };

      for (const key of keysToRemove) {
        delete currentState[key];
      }
    } else if (action.type === 'clear') {
      currentState = {};
    }

    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
