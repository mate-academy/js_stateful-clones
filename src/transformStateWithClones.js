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

  for (const act of actions) {
    if (act.type === 'addProperties') {
      currentState = {
        ...currentState,
        ...act.extraData,
      };
    } else if (act.type === 'removeProperties') {
      currentState = { ...currentState };

      for (const key of act.keysToRemove) {
        delete currentState[key];
      }
    } else if (act.type === 'clear') {
      currentState = {};
    }
    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
