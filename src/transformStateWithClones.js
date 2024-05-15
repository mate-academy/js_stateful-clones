'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const currentState = { ...state };
  const stateHistory = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      for (const date in obj.extraData) {
        currentState[date] = obj.extraData[date];
      }
    }

    if (obj.type === 'removeProperties') {
      for (const date in obj.keysToRemove) {
        for (const key in currentState) {
          if (key === obj.keysToRemove[date]) {
            delete currentState[key];
          }
        }
      }
    }

    if (obj.type === 'clear') {
      for (const key in currentState) {
        delete currentState[key];
      }
    }
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
