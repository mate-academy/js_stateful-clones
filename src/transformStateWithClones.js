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
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties': {
        const newState = { ...currentState };

        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete newState[key];
          }
        }

        currentState = newState;
        break;
      }

      default:
        // Unknown action type – explicitly ignored
        // (state remains unchanged)
        break;
    }

    states.push(currentState);
  }

  return states;
}

module.exports = transformStateWithClones;
