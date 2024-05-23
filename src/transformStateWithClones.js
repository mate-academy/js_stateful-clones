'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(currentState, action.extraData);

        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
      }

      case 'clear': {
        for (const key of Object.keys(currentState)) {
          delete currentState[key];
        }
        break;
      }

      default: {
        break;
      }
    }
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
