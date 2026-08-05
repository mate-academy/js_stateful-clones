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

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (action.type === 'clear') {
      currentState = {};
    }

    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        currentState[key] = action.extraData[key];
      }
    }

    if (action.type === 'removeProperties') {
      for (const key in action.keysToRemove) {
        delete currentState[action.keysToRemove[key]];
      }
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
