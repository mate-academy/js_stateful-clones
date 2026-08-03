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
    switch (action.type) {
      case 'addProperties': {
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;
      }

      case 'removeProperties': {
        const nextState = { ...currentState };

        for (const property of action.keysToRemove) {
          delete nextState[property];
        }
        currentState = nextState;
        break;
      }

      case 'clear': {
        currentState = {};
        break;
      }

      default:
        break;
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
