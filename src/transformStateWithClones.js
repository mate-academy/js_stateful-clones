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
    let nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextState, action.extraData);

        break;
      case 'removeProperties':
        const keys = action.keysToRemove;

        for (const key of keys) {
          delete nextState[key];
        }

        break;
      case 'clear':
        nextState = {};

        break;
      default:
        break;
    }

    currentState = nextState;
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
