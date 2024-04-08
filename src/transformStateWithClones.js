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
    const { type, keysToRemove, extraData } = action;
    let nextState = { ...currentState };

    switch (type) {
      case 'addProperties':
        nextState = { ...currentState, ...extraData };
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete nextState[key];
        }
        break;
      case 'clear':
        nextState = {};
        break;
    }

    stateHistory.push(nextState);
    currentState = nextState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
