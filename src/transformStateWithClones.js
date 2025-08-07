'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let lastState = { ...state };

  for (const action of actions) {
    const currentState = { ...lastState };

    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in currentState) {
        delete currentState[key];
      }
    }

    stateHistory.push(currentState);
    lastState = currentState;
  }
  return stateHistory;
}

module.exports = transformStateWithClones;
