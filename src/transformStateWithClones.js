'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArray = [];
  const currentState = { ...state };

  for (const action of actions) {
    const { type, extraData } = action;
    let { keysToRemove } = action;

    switch (type) {
      case 'addProperties': {
        for (const [key, value] of Object.entries(extraData)) {
          currentState[key] = value;
        }

        break;
      }

      case 'clear':
        keysToRemove = Object.keys(currentState);
        // fallsthrough

      case 'removeProperties': {
        for (const key of keysToRemove) {
          delete currentState[key];
        }

        break;
      }

      default: {
        break;
      }
    }

    statesArray.push({ ...currentState });
  }

  return statesArray;
}

module.exports = transformStateWithClones;
