'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;

      case 'addProperties':
        for (const key in action.extraData) {
          currentState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    states.push({ ...currentState });
  }

  return states;
}

module.exports = transformStateWithClones;
