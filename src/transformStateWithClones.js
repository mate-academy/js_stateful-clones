'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here]

  const statesHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    // criar nova copia baseada na anterior.
    currentState = { ...currentState };

    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        for (const key in action.extraData) {
          currentState[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
      default:
        // ignora tipos desconhecidos
        break;
    }
    statesHistory.push(currentState);
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
