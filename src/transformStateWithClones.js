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
    const nextState = { ...currentState };

    if (action.type === 'addProperties') {
      Object.assign(nextState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete nextState[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in nextState) {
        delete nextState[key];
      }
    }

    stateHistory.push(nextState);

    currentState = nextState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
