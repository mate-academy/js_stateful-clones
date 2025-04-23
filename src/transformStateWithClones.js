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
    if (act.type === 'clear') {
      currentState = {};
    }
    if (act.type === 'addProperties') {
      currentState = { ...currentState, ...act.extraData };
    }
    if (act.type === 'removeProperties') {
      currentState = { ...currentState };
      for (const data of act.keysToRemove) {
        delete currentState[data];
      }
    }
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
