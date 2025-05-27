'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(newState, actions[i].extraData);
      stateHistory.push({ ...newState });
    } else if (actions[i].type === 'removeProperties') {
      for (let x = 0; x < actions[i].keysToRemove.length; x++) {
        delete newState[actions[i].keysToRemove[x]];
      }
      stateHistory.push({ ...newState });
    } else {
      for (const key in newState) {
        delete newState[key];
      }
      stateHistory.push({ ...newState });
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
