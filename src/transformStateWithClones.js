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
  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(newState, actions[i].extraData);
    } else if (actions[i].type === 'removeProperties') {
      for (let j = 0; j < actions[i].keysToRemove.length; j++) {
        delete newState[actions[i].keysToRemove[j]];
      }
    } else if (actions[i].type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }

    finalState = { ...newState };

    stateHistory.push(finalState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
