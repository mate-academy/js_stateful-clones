'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesHistory = [];
  let currentState = { ...state };
  let nextState;

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        nextState = { ...currentState, ...extraData };
        break;

      case 'removeProperties':
        nextState = { ...currentState };

        for (const key of keysToRemove) {
          if (nextState.hasOwnProperty(key)) {
            delete nextState[key];
          }
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        nextState = currentState;
    }

    statesHistory.push({ ...nextState });
    currentState = { ...nextState };
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
