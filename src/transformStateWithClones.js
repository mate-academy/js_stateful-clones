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
  const stateClone = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        stateClone[key] = actions[i].extraData[key];
      }
      stateHistory.push({ ...stateClone });
    }

    if (actions[i].type === 'removeProperties') {
      for (let n = 0; n < actions[i].keysToRemove.length; n++) {
        delete stateClone[actions[i].keysToRemove[n]];
      }
      stateHistory.push({ ...stateClone });
    }

    if (actions[i].type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
      stateHistory.push({ ...stateClone });
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
