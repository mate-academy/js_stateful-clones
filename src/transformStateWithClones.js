'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    let nextState;

    if (action.type === 'clear') {
      nextState = {};
    }

    if (action.type === 'addProperties') {
      nextState = {
        ...currentState,
        ...action.extraData,
      };
    }

    if (action.type === 'removeProperties') {
      nextState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete nextState[key];
      }
    }

    stateHistory.push(nextState);
    currentState = nextState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
