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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties': {
        const stateWithRemovedProperties = { ...currentState };

        for (const key of action.keysToRemove) {
          delete stateWithRemovedProperties[key];
        }
        currentState = stateWithRemovedProperties;
        break;
      }

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    statesHistory.push(currentState);
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
