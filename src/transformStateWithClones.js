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
    switch (action.type) {
      case 'clear': {
        currentState = {};
        break;
      }

      case 'addProperties': {
        const stateCopy = { ...currentState, ...action.extraData };

        currentState = stateCopy;
        break;
      }

      case 'removeProperties': {
        const stateCopy = Object.keys(currentState).reduce((newState, key) => {
          if (!action.keysToRemove.includes(key)) {
            newState[key] = currentState[key];
          }

          return newState;
        }, {});

        currentState = stateCopy;
        break;
      }

      default: {
        throw new Error(`Unknown action type: ${action.type}`);
      }
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
