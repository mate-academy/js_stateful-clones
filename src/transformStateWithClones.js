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
      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          currentState = { ...currentState, ...action.extraData };
        } else {
          throw new Error('Invalid extraData in addProperties action');
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          currentState = { ...currentState };

          for (const key of action.keysToRemove) {
            delete currentState[key];
          }
        } else {
          throw new Error('Invalid keysToRemove in removeProperties action');
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    states.push({ ...currentState });
  }

  return states;
}

module.exports = transformStateWithClones;
