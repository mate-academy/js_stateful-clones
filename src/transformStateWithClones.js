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
    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);
      stateHistory.push({ ...currentState });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        if (key in currentState) {
          delete currentState[key];
        }
      }
      stateHistory.push({ ...currentState });
    }

    if (action.type === 'clear') {
      Object.keys(currentState).forEach((key) => delete currentState[key]);
      stateHistory.push({ ...currentState });
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
