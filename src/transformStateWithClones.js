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
    const { type, keysToRemove, extraData } = action;

    switch (type) {
      case 'addProperties':
        currentState = { ...currentState, ...extraData };
        break;

      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
