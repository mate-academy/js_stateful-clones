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

  for (const action of actions) {
    let nextState;

    if (action.type === 'addProperties') {
      nextState = { ...currentState };

      for (const key in action.extraData) {
        nextState[key] = action.extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      nextState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete nextState[key];
      }
    } else if (action.type === 'clear') {
      nextState = {};
    } else {
      nextState = { ...currentState };
    }

    stateHistory.push({ ...nextState });
    currentState = nextState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
