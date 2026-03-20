'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (const action of actions) {
    const newState = { ...currentState };

    switch (action.type) {
      default: {
        break;
      }

      case 'clear': {
        Object.keys(newState).forEach((key) => delete newState[key]);
        break;
      }

      case 'addProperties': {
        for (const key in action.extraData) {
          newState[key] = action.extraData[key];
        }
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
      }
    }
    result.push(newState);
    currentState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;
