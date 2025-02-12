'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = { ...state };

  for (const action of actions) {
    const newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          for (const key in action.extraData) {
            newState[key] = action.extraData[key];
          }
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete newState[key];
          }
        }
        break;

      case 'clear':
        Object.keys(newState).forEach((key) => delete newState[key]);
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    states.push(newState);
    currentState = newState;
  }

  return states;
}

module.exports = transformStateWithClones;
