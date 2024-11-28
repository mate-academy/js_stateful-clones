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

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        currentState = Object.keys(currentState).reduce((newState, key) => {
          if (!action.keysToRemove.includes(key)) {
            newState[key] = currentState[key];
          }

          return newState;
        }, {});
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    stateHistory.push({ ...currentState });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
